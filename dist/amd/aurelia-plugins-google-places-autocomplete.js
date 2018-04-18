define(['exports', 'aurelia-pal', './aurelia-plugins-google-places-autocomplete-config'], function (exports, _aureliaPal, _aureliaPluginsGooglePlacesAutocompleteConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(_aureliaPluginsGooglePlacesAutocompleteConfig.Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources([_aureliaPal.PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-converter'), _aureliaPal.PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-element')]);
  }
});