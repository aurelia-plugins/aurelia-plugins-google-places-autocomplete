'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});



var Config = exports.Config = function () {
  function Config() {
    

    this._config = { apiKey: '', apiLibraries: 'places', apiLoadedEvent: 'googlemap:api:loaded', language: 'en', loadApiScript: true, options: { types: ['geocode'] } };
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