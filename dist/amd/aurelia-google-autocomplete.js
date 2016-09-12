define(['exports', './aurelia-google-autocomplete-config', './aurelia-google-autocomplete-class'], function (exports, _aureliaGoogleAutocompleteConfig, _aureliaGoogleAutocompleteClass) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GoogleAutocomplete = exports.Config = undefined;
  exports.configure = configure;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(_aureliaGoogleAutocompleteConfig.Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-google-autocomplete-class');
  }

  exports.Config = _aureliaGoogleAutocompleteConfig.Config;
  exports.GoogleAutocomplete = _aureliaGoogleAutocompleteClass.GoogleAutocomplete;
});