define(['exports', 'aurelia-dependency-injection', 'aurelia-event-aggregator', 'aurelia-templating', './aurelia-plugins-google-places-autocomplete-config'], function (exports, _aureliaDependencyInjection, _aureliaEventAggregator, _aureliaTemplating, _aureliaPluginsGooglePlacesAutocompleteConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GoogleAutocomplete = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              return step("next", value);
            }, function (err) {
              return step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  

  var _dec, _dec2, _class;

  var GoogleAutocomplete = exports.GoogleAutocomplete = (_dec = (0, _aureliaTemplating.customElement)('aup-google-places-autocomplete'), _dec2 = (0, _aureliaDependencyInjection.inject)(Element, _aureliaPluginsGooglePlacesAutocompleteConfig.Config, _aureliaEventAggregator.EventAggregator), _dec(_class = _dec2(_class = function () {
    function GoogleAutocomplete(element, config, eventAggregator) {
      var _this = this;

      

      this._scriptPromise = null;
      this.disabled = true;

      this._config = config;
      this._element = element;
      this._eventAggregator = eventAggregator;

      if (!this._config.get('key')) return console.error('No Google API key has been specified.');

      this._eventAggregator.subscribe('aurelia-plugins:google-places-autocomplete:clear', function () {
        _this.input.value = '';
      });

      if (this._config.get('loadApiScript')) {
        this._loadApiScript();return this._initialize();
      }

      this._eventAggregator.subscribe(this._config.get('apiScriptLoadedEvent'), function (scriptPromise) {
        _this._scriptPromise = scriptPromise;
        _this._initialize();
      });
    }

    GoogleAutocomplete.prototype._initialize = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

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
                  if (place) _this2._eventAggregator.publish('aurelia-plugins:google-places-autocomplete:place-changed', place);
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
      var _this3 = this;

      if (this._scriptPromise) return this._scriptPromise;

      if (window.google === undefined || window.google.maps === undefined) {
        var script = document.createElement('script');
        script.async = true;
        script.defer = true;
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this._config.get('key') + '&libraries=' + this._config.get('libraries') + '&language=' + this._config.get('language') + '&callback=aureliaPluginsGooglePlacesAutocompleteCallback';
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
        return this._scriptPromise;
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
});