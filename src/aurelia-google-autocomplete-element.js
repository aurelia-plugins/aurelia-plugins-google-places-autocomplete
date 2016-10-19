// IMPORTS
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {customElement} from 'aurelia-templating';

import {Config} from './aurelia-google-autocomplete-config';


// CLASS ATTRIBUTES
@customElement('google-autocomplete')
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
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this._config.get('apiKey') + '&language=' + this._config.get('language') + '&libraries=places&callback=aureliaGoogleAutocompleteCallback';
      script.type = 'text/javascript';
      document.body.appendChild(script);

      this._scriptPromise = new Promise((resolve, reject) => {
        window.aureliaGoogleAutocompleteCallback = () => {
          this._eventAggregator.publish('google-autocomplete:api_loaded', this._scriptPromise);
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
