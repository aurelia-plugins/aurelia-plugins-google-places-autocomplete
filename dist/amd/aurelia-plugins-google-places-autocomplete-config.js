'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = exports.Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this._config = {
      apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded',
      key: '',
      language: 'en',
      libraries: 'places',
      loadApiScript: true,
      options: { types: ['geocode'] }
    };
  }

  Config.prototype.get = function get(key) {
    return this._config[key];
  };

  Config.prototype.options = function options(obj) {
    Object.assign(this._config, obj);
  };

  Config.prototype.set = function set(key, value) {
    this._config[key] = value;
    return this._config[key];
  };

  return Config;
}();