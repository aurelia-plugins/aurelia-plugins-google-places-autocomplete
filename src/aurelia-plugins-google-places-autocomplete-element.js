// IMPORTS
import {bindingMode} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, customElement} from 'aurelia-templating';

import {Config} from './aurelia-plugins-google-places-autocomplete-config';


// CLASS ATTRIBUTES
@customElement('aup-google-places-autocomplete')
@inject(Element, Config, EventAggregator)


// PUBLIC CLASS
export class GoogleAutocomplete {
  // PRIVATE PROPERTIES
  _config;
  _element;
  _eventAggregator;
  _scriptPromise = null;

  // BINDABLE PROPERTIES
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  // PUBLIC PROPERTIES
  disabled = true;

  // CONSTRUCTOR
  constructor(element, config, eventAggregator) {
    this._config = config;
    this._element = element;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('key')) return console.error('No Google API key has been specified.');

    if (this._config.get('loadApiScript')) { this._loadApiScript(); return this._initialize(); }
    this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), scriptPromise => {
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
      if (place) this._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:place-changed', place);
    });
  }

  _loadApiScript() {
    if (this._scriptPromise) return this._scriptPromise;

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
      return this._scriptPromise;
    }

    if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(resolve => { resolve(); });
      return this._scriptPromise;
    }

    return false;
  }
}
