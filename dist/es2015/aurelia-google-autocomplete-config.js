
export let Config = class Config {
  constructor() {
    this._config = { apiKey: '', apiLibraries: 'places', apiLoadedEvent: 'googlemap:api:loaded', language: 'en', loadApiScript: true, options: { types: ['geocode'] } };
  }

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
};