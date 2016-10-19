// PUBLIC CLASS
export class Config {
  // PRIVATE PROPERTIES
  _config;

  // CONSTRUCTOR
  constructor() {
    this._config = { apiKey: '', apiLoadedEvent: 'googlemap:api:loaded', language: 'en', loadApiScript: true, options: { types: ['geocode'] } };
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
