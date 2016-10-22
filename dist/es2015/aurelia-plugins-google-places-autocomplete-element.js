var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _initDefineProp(target, property, descriptor, context) {
  if (!descriptor) return;
  Object.defineProperty(target, property, {
    enumerable: descriptor.enumerable,
    configurable: descriptor.configurable,
    writable: descriptor.writable,
    value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
  });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function _initializerWarningHelper(descriptor, context) {
  throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { EventAggregator } from 'aurelia-event-aggregator';
import { bindable, customElement } from 'aurelia-templating';

import { Config } from './aurelia-plugins-google-places-autocomplete-config';

export let GoogleAutocomplete = (_dec = customElement('aup-google-places-autocomplete'), _dec2 = inject(Element, Config, EventAggregator), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = class GoogleAutocomplete {
  constructor(element, config, eventAggregator) {
    this._scriptPromise = null;

    _initDefineProp(this, 'value', _descriptor, this);

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
      script.src = `https://maps.googleapis.com/maps/api/js?callback=aureliaPluginsGooglePlacesAutocompleteCallback&key=${ this._config.get('key') }&language=${ this._config.get('language') }&libraries=${ this._config.get('libraries') }`;
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
}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);