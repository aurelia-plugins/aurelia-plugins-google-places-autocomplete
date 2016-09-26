import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';

// PUBLIC CLASS
export class Config {
  // PRIVATE PROPERTIES
  _config;

  // CONSTRUCTOR
  constructor() {
    this._config = { apiKey: '', apiLoadedEvent: 'googlemap:api:loaded', loadApiScript: true, options: { types: ['geocode'] } };
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
@inject(Element, Config, EventAggregator)


// PUBLIC CLASS
export class GoogleAutocomplete {
  // PRIVATE PROPERTIES
  _config;
  _element;
  _eventAggregator;
  _scriptPromise = null;

  // PUBLIC PROPERTIES
  disabled = true;

  // CONSTRUCTOR
  constructor(element, config, eventAggregator) {
    this._element = element;
    this._config = config;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('apiKey')) console.error('No API key has been specified.');
    if (this._config.get('loadApiScript')) this._loadApiScript();

    this._eventAggregator.subscribe('google-autocomplete:clear', () => {
      this.input.value = '';
    });
  }

  // LIFECYCLE HANDLERS
  attached() {
    if (this._config.get('loadApiScript')) return this._initialize();
    this._eventAggregator.subscribe(this._config.get('apiLoadedEvent'), scriptPromise => {
      this._scriptPromise = scriptPromise;
      this._initialize();
    });
  }

  // PRIVATE METHODS
  async _initialize() {
    await this._scriptPromise;
    var autocomplete = new window.google.maps.places.Autocomplete(this.input, this._config.get('options'));
    this.disabled = false;
    autocomplete.addListener('place_changed', () => {
      var place = autocomplete.getPlace();
      if (place) this._eventAggregator.publish('google-autocomplete:place_changed', place);
    });
  }

  _loadApiScript() {
    if (this._scriptPromise) return this._scriptPromise;

    if (window.google === undefined || window.google.maps === undefined) {
      let script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this._config.get('apiKey') + '&libraries=places&callback=aureliaGoogleAutocompleteCallback';
      script.type = 'text/javascript';
      document.body.appendChild(script);

      this._scriptPromise = new Promise((resolve, reject) => {
        window.aureliaGoogleAutocompleteCallback = () => { resolve(); };
        script.onerror = error => { reject(error); };
      });
      return this._scriptPromise;
    }

    if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(resolve => { resolve(); });
      return this._scriptPromise;
    }

    return false;
  }
}

// IMPORTS
// PUBLIC METHODS
export function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(Config);
  if (configCallback !== undefined && typeof(configCallback) === 'function')
    configCallback(instance);
  aurelia.globalResources('./aurelia-google-autocomplete-class');
}


// PUBLIC CLASSES
export {Config};
export {GoogleAutocomplete}
