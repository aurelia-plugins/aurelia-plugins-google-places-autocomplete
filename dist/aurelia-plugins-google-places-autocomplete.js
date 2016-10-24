import {bindingMode} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable,customElement} from 'aurelia-templating';

// PUBLIC CLASS
export class HighlightValueConverter {
  // INTERFACE METHODS
  toView(array) {
    array.forEach(item => {
      if (!item.matched_substrings || !item.matched_substrings.length) return;
      var description = item.description;
      item.innerHTML = '';
      for (var i = 0, j = item.matched_substrings.length; i < j; i++) {
        var length = item.matched_substrings[i].length;
        var offset = item.matched_substrings[i].offset;
        item.innerHTML += [description.slice(0, offset), '<strong>', description.slice(offset, length), '</strong>', description.slice(length)].join('');
      }
    });
    return array;
  }
}

// PUBLIC CLASS
export class Config {
  // PRIVATE PROPERTIES
  _config;

  // CONSTRUCTOR
  constructor() {
    this._config = {
      apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded',
      key: '',
      language: 'en',
      libraries: 'places',
      loadApiScript: true,
      options: { types: ['geocode'] }
    };
  }

  // PUBLIC METHODS
  get(key) {
    return this._config[key];
  }

  options(obj) {
    Object.assign(this._config, obj);
  }

  set(key, value) {
    this._config[key] = value;
    return this._config[key];
  }
}

// IMPORTS
// CLASS ATTRIBUTES
@customElement('aup-google-places-autocomplete')
@inject(Element, Config, EventAggregator)


// PUBLIC CLASS
export class GooglePlacesAutocomplete {
  // PRIVATE PROPERTIES
  _config;
  _element;
  _eventAggregator;

  _scriptPromise = null;
  _service = null;
  _servicePromise = null;
  _serviceResolve = null;

  // BINDABLE PROPERTIES
  @bindable itemClass = 'font-small p-x-8 p-y-2';
  @bindable itemHoverClass = 'bg-clouds font-small p-x-8 p-y-2';
  @bindable placeholder = 'Enter a location';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  // PUBLIC PROPERTIES
  disabled = true;
  index = -1;
  predictions = [];
  selected = false;
  show = false;

  // CONSTRUCTOR
  constructor(element, config, eventAggregator) {
    this._config = config;
    this._element = element;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('key')) return console.error('No Google API key has been specified.');

    this._servicePromise = new Promise(resolve => { this._serviceResolve = resolve; });

    if (this._config.get('loadApiScript')) { this._loadApiScript(); return this._initialize(); }
    this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), scriptPromise => {
      this._scriptPromise = scriptPromise;
      this._initialize();
    });
  }

  // BINDABLE METHODS
  async valueChanged(newValue) {
    await this._servicePromise;
    if (!newValue) return this._clear();
    if (this.selected) return this._clear(true);
    var request = Object.assign({ input: newValue }, this._config.get('options'));
    this._service.getPlacePredictions(request, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) return this._clear();
      this.predictions = predictions;
      this.show = true;
    });
  }

  // PUBLIC METHODS
  blur() {
    this._clear(true);
  }

  focus() {
    this._clear(true, true);
  }

  keydown(event) {
    if (this.selected) this.selected = false;
    if (!this.show) return true;
    switch (event.keyCode) {
      case 13:
        this.index !== -1 ? this.select(this.predictions[this.index], false) : this.show = false;
        setTimeout(() => { this._element.firstElementChild.blur(); }, 100);
        break;
      case 27: this.show = false; break;
      case 38:
        this.index--;
        if (this.index < 0) this.index = 0;
        return false;
      case 40:
        this.index++;
        if (this.index >= this.predictions.length) this.index = this.predictions.length - 1;
        return false;
    }
    return true;
  }

  select(prediction, submit = true) {
    this.value = prediction.description;
    this.selected = true;
    if (submit) setTimeout(() => { this._dispatchEvent(); }, 100);
    this._clear(true);
  }

  // PRIVATE METHODS
  _clear(keep = false, show = false) {
    if (!keep) this.predictions = [];
    this.index = -1;
    this.show = show;
  }

  _dispatchEvent() {
    if (!this._element.firstElementChild.form.attributes['submit.delegate']) return;
    var clickEvent;
    if (window.CustomEvent)
      clickEvent = new CustomEvent('submit', { bubbles: true, details: event });
    else {
      clickEvent = document.createEvent('CustomEvent');
      clickEvent.initCustomEvent('submit', true, true, { data: event });
    }
    this._element.firstElementChild.form.dispatchEvent(clickEvent);
    this._element.firstElementChild.blur();
  }

  async _initialize() {
    await this._scriptPromise;
    this._service = new window.google.maps.places.AutocompleteService();
    this._serviceResolve();
    this.disabled = false;
  }

  _loadApiScript() {
    if (this._scriptPromise) return;
    if (window.google === undefined || window.google.maps === undefined) {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?callback=aureliaPluginsGooglePlacesAutocompleteCallback&key=${this._config.get('key')}&language=${this._config.get('language')}&libraries=${this._config.get('libraries')}`;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      this._scriptPromise = new Promise((resolve, reject) => {
        window.aureliaPluginsGooglePlacesAutocompleteCallback = () => {
          this._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:api-script-loaded', this._scriptPromise);
          resolve();
        };
        script.onerror = error => { reject(error); };
      });
    }
    else if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(resolve => { resolve(); });
    }
  }
}

// IMPORTS
// PUBLIC METHODS
export function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(Config);
  if (configCallback !== undefined && typeof(configCallback) === 'function')
    configCallback(instance);
  aurelia.globalResources('./aurelia-plugins-google-places-autocomplete-converter', './aurelia-plugins-google-places-autocomplete-element');
}
