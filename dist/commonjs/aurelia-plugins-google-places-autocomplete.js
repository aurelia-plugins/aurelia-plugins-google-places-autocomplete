'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = configure;

var _aureliaPal = require('aurelia-pal');

var _aureliaPluginsGooglePlacesAutocompleteConfig = require('./aurelia-plugins-google-places-autocomplete-config');

function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(_aureliaPluginsGooglePlacesAutocompleteConfig.Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources(_aureliaPal.PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-converter'), _aureliaPal.PLATFORM.moduleName('./aurelia-plugins-google-places-autocomplete-element'));
}