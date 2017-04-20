System.register(['./aurelia-plugins-google-places-autocomplete-config'], function (_export, _context) {
  "use strict";

  var Config;
  function configure(aurelia, configCallback) {
    const instance = aurelia.container.get(Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-plugins-google-places-autocomplete-converter', './aurelia-plugins-google-places-autocomplete-element');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaPluginsGooglePlacesAutocompleteConfig) {
      Config = _aureliaPluginsGooglePlacesAutocompleteConfig.Config;
    }],
    execute: function () {}
  };
});