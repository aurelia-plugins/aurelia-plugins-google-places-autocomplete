'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaPluginsGooglePlacesAutocompleteConfig = require('./aurelia-plugins-google-places-autocomplete-config');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_aureliaPluginsGooglePlacesAutocompleteConfig.Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources('./aurelia-plugins-google-places-autocomplete-converter', './aurelia-plugins-google-places-autocomplete-element');
}