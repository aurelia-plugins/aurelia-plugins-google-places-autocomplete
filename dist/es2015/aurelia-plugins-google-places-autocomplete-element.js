var _dec, _dec2, _class;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { customElement } from 'aurelia-templating';

import { Config } from './aurelia-plugins-google-places-autocomplete-config';

export let GoogleAutocomplete = (_dec = customElement('aup-google-places-autocomplete'), _dec2 = inject(Element, Config, EventAggregator), _dec(_class = _dec2(_class = class GoogleAutocomplete {
  constructor(element, config, eventAggregator) {
    this._scriptPromise = null;
    this.disabled = true;

    this._config = config;
    this._element = element;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('key')) return console.error('No Google API key has been specified.');

    this._eventAggregator.subscribe('aurelia-plugins:google-places-autocomplete:clear', () => {
      this.input.value = '';
    });

    if (this._config.get('loadApiScript')) {
      this._loadApiScript();return this._initialize();
    }

    this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), scriptPromise => {
      this._scriptPromise = scriptPromise;
      this._initialize();
    });
  }

  _initialize() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this._scriptPromise;
      var autocomplete = new window.google.maps.places.Autocomplete(_this.input, _this._config.get('options'));
      _this.disabled = false;
      autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        if (place) _this._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:place-changed', place);
      });
    })();
  }

  _loadApiScript() {
    if (this._scriptPromise) return this._scriptPromise;

    if (window.google === undefined || window.google.maps === undefined) {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this._config.get('key') + '&libraries=' + this._config.get('libraries') + '&language=' + this._config.get('language') + '&callback=aureliaPluginsGooglePlacesAutocompleteCallback';
      script.type = 'text/javascript';
      document.body.appendChild(script);

      this._scriptPromise = new Promise((resolve, reject) => {
        window.aureliaPluginsGooglePlacesAutocompleteCallback = () => {
          this._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:api-script-loaded', this._scriptPromise);
          resolve();
        };
        script.onerror = error => {
          reject(error);
        };
      });
      return this._scriptPromise;
    }

    if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(resolve => {
        resolve();
      });
      return this._scriptPromise;
    }

    return false;
  }
}) || _class) || _class);