define(['exports', './aurelia-google-autocomplete-config'], function (exports, _aureliaGoogleAutocompleteConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(_aureliaGoogleAutocompleteConfig.Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-google-autocomplete-element');
  }
});