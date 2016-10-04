'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAutocomplete = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _dec, _dec2, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _aureliaEventAggregator = require('aurelia-event-aggregator');

var _aureliaTemplating = require('aurelia-templating');

var _aureliaGoogleAutocompleteConfig = require('./aurelia-google-autocomplete-config');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }



var GoogleAutocomplete = exports.GoogleAutocomplete = (_dec = (0, _aureliaTemplating.customElement)('google-autocomplete'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaGoogleAutocompleteConfig.Config, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
  function GoogleAutocomplete(element, config, eventAggregator) {
    var _this = this;

    

    this._scriptPromise = null;
    this.disabled = true;

    this._element = element;
    this._config = config;
    this._eventAggregator = eventAggregator;

    if (!this._config.get('apiKey')) console.error('No API key has been specified.');
    if (this._config.get('loadApiScript')) this._loadApiScript();

    this._eventAggregator.subscribe('google-autocomplete:clear', function () {
      _this.input.value = '';
    });
  }

  GoogleAutocomplete.prototype.attached = function attached() {
    var _this2 = this;

    if (this._config.get('loadApiScript')) return this._initialize();
    this._eventAggregator.subscribe(this._config.get('apiLoadedEvent'), function (scriptPromise) {
      _this2._scriptPromise = scriptPromise;
      _this2._initialize();
    });
  };

  GoogleAutocomplete.prototype._initialize = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      var _this3 = this;

      var autocomplete;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this._scriptPromise;

            case 2:
              autocomplete = new window.google.maps.places.Autocomplete(this.input, this._config.get('options'));

              this.disabled = false;
              autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();
                if (place) _this3._eventAggregator.publish('google-autocomplete:place_changed', place);
              });

            case 5:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function _initialize() {
      return _ref.apply(this, arguments);
    }

    return _initialize;
  }();

  GoogleAutocomplete.prototype._loadApiScript = function _loadApiScript() {
    var _this4 = this;

    if (this._scriptPromise) return this._scriptPromise;

    if (window.google === undefined || window.google.maps === undefined) {
      var _ret = function () {
        var script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + _this4._config.get('apiKey') + '&libraries=places&callback=aureliaGoogleAutocompleteCallback';
        script.type = 'text/javascript';
        document.body.appendChild(script);

        _this4._scriptPromise = new Promise(function (resolve, reject) {
          window.aureliaGoogleAutocompleteCallback = function () {
            resolve();
          };
          script.onerror = function (error) {
            reject(error);
          };
        });
        return {
          v: _this4._scriptPromise
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    if (window.google && window.google.maps) {
      this._scriptPromise = new Promise(function (resolve) {
        resolve();
      });
      return this._scriptPromise;
    }

    return false;
  };

  return GoogleAutocomplete;
}()) || _class) || _class);