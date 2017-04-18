// PUBLIC CLASS
export class Config {
  // PRIVATE PROPERTIES
  config;

  // CONSTRUCTOR
  constructor() {
    this.config = {
      apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded',
      key: '',
      language: 'en',
      libraries: 'places',
      loadApiScript: true,
      options: { types: ['geocode'] }
    };
  }

  // PUBLIC METHODS
  get(key) {
    return this.config[key];
  }

  options(obj) {
    Object.assign(this.config, obj);
  }

  set(key, value) {
    this.config[key] = value;
    return this.config[key];
  }
}