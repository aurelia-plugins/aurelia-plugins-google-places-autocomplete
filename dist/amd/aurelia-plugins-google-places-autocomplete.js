define(['exports', './aurelia-plugins-google-places-autocomplete-config'], function (exports, _aureliaPluginsGooglePlacesAutocompleteConfig) {
  'use strict';

  exports.__esModule = true;
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    const instance = aurelia.container.get(_aureliaPluginsGooglePlacesAutocompleteConfig.Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-plugins-google-places-autocomplete-converter', './aurelia-plugins-google-places-autocomplete-element');
  }
});