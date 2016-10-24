var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

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

export var GooglePlacesAutocomplete = (_dec = customElement('aup-google-places-autocomplete'), _dec2 = inject(Element, Config, EventAggregator), _dec3 = bindable({ defaultBindingMode: bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
  function GooglePlacesAutocomplete(element, config, eventAggregator) {
    var _this = this;

    

    this._scriptPromise = null;
    this._service = null;
    this._servicePromise = null;
    this._serviceResolve = null;

    _initDefineProp(this, 'itemClass', _descriptor, this);

    _initDefineProp(this, 'itemHoverClass', _descriptor2, this);

    _initDefineProp(this, 'placeholder', _descriptor3, this);

    _initDefineProp(this, 'value', _descriptor4, this);

    this.disabled = true;
    this.index = -1;
    this.predictions = [];
    this.selected = false;
    this.show = false;

    this._config = config;
    this._element = element;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('key')) return console.error('No Google API key has been specified.');

    this._servicePromise = new Promise(function (resolve) {
      _this._serviceResolve = resolve;
    });

    if (this._config.get('loadApiScript')) {
      this._loadApiScript();return this._initialize();
    }
    this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), function (scriptPromise) {
      _this._scriptPromise = scriptPromise;
      _this._initialize();
    });
  }

  GooglePlacesAutocomplete.prototype.valueChanged = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(newValue) {
      var _this2 = this;

      var request;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._servicePromise;

            case 2:
              if (newValue) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', this._clear());

            case 4:
              if (!this.selected) {
                _context.next = 6;
                break;
              }

              return _context.abrupt('return', this._clear(true));

            case 6:
              request = Object.assign({ input: newValue }, this._config.get('options'));

              this._service.getPlacePredictions(request, function (predictions, status) {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK) return _this2._clear();
                _this2.predictions = predictions;
                _this2.show = true;
              });

            case 8:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function valueChanged(_x) {
      return _ref.apply(this, arguments);
    }

    return valueChanged;
  }();

  GooglePlacesAutocomplete.prototype.blur = function blur() {
    this._clear(true);
  };

  GooglePlacesAutocomplete.prototype.focus = function focus() {
    this._clear(true, true);
  };

  GooglePlacesAutocomplete.prototype.keydown = function keydown(event) {
    if (this.selected) this.selected = false;
    if (!this.show) return true;
    switch (event.keyCode) {
      case 13:
        this.index != -1 ? this.select(this.predictions[this.index]) : this.show = false;
        break;
      case 27:
        this.show = false;break;
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
  };

  GooglePlacesAutocomplete.prototype.select = function select(prediction) {
    this.value = prediction.description;
    this.selected = true;
    this._clear(true);
  };

  GooglePlacesAutocomplete.prototype._clear = function _clear() {
    var keep = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
    var show = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

    if (!keep) this.predictions = [];
    this.index = -1;
    this.show = show;
  };

  GooglePlacesAutocomplete.prototype._initialize = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this._scriptPromise;

            case 2:
              this._service = new window.google.maps.places.AutocompleteService();
              this._serviceResolve();
              this.disabled = false;

            case 5:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function _initialize() {
      return _ref2.apply(this, arguments);
    }

    return _initialize;
  }();

  GooglePlacesAutocomplete.prototype._loadApiScript = function _loadApiScript() {
    var _this3 = this;

    if (this._scriptPromise) return;
    if (window.google === undefined || window.google.maps === undefined) {
      var script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = 'https://maps.googleapis.com/maps/api/js?callback=aureliaPluginsGooglePlacesAutocompleteCallback&key=' + this._config.get('key') + '&language=' + this._config.get('language') + '&libraries=' + this._config.get('libraries');
      script.type = 'text/javascript';
      document.body.appendChild(script);
      this._scriptPromise = new Promise(function (resolve, reject) {
        window.aureliaPluginsGooglePlacesAutocompleteCallback = function () {
          _this3._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:api-script-loaded', _this3._scriptPromise);
          resolve();
        };
        script.onerror = function (error) {
          reject(error);
        };
      });
    } else if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(function (resolve) {
        resolve();
      });
    }
  };

  return GooglePlacesAutocomplete;
}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'itemClass', [bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'font-small p-x-8 p-y-2';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'itemHoverClass', [bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'bg-clouds font-small p-x-8 p-y-2';
  }
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'placeholder', [bindable], {
  enumerable: true,
  initializer: function initializer() {
    return 'Enter a location';
  }
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
  enumerable: true,
  initializer: null
})), _class2)) || _class) || _class);