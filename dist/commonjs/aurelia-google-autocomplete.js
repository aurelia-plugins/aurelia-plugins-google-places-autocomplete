'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GoogleAutocomplete = exports.Config = undefined;
exports.configure = configure;

var _aureliaGoogleAutocompleteConfig = require('./aurelia-google-autocomplete-config');

var _aureliaGoogleAutocompleteClass = require('./aurelia-google-autocomplete-class');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_aureliaGoogleAutocompleteConfig.Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources('./aurelia-google-autocomplete-class');
}

exports.Config = _aureliaGoogleAutocompleteConfig.Config;
exports.GoogleAutocomplete = _aureliaGoogleAutocompleteClass.GoogleAutocomplete;