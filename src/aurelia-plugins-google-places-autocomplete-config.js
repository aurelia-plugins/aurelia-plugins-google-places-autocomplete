// PUBLIC CLASS
export class Config {
  // PRIVATE PROPERTIES
  _config;

  // CONSTRUCTOR
  constructor() {
    this._config = {
      apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded',
      key: '',
      language: 'en',
      libraries: 'places',
      loadApiScript: true,
      options: { types: ['geocode'] },
      region: 'US'
    };
  }

  // PUBLIC METHODS
  all() {
    return this._config;
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
}