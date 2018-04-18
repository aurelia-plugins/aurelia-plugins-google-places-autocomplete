'use strict';

System.register(['aurelia-pal', './aurelia-plugins-google-places-autocomplete-config'], function (_export, _context) {
  "use strict";

  var PLATFORM, Config;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources([PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-converter'), PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-element')]);
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaPal) {
      PLATFORM = _aureliaPal.PLATFORM;
    }, function (_aureliaPluginsGooglePlacesAutocompleteConfig) {
      Config = _aureliaPluginsGooglePlacesAutocompleteConfig.Config;
    }],
    execute: function () {}
  };
});