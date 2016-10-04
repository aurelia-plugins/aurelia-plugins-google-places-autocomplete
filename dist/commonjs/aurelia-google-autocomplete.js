'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaGoogleAutocompleteConfig = require('./aurelia-google-autocomplete-config');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_aureliaGoogleAutocompleteConfig.Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources('./aurelia-google-autocomplete-element');
}