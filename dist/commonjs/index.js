'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaPluginsGooglePlacesAutocomplete = require('./aurelia-plugins-google-places-autocomplete');

Object.keys(_aureliaPluginsGooglePlacesAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaPluginsGooglePlacesAutocomplete[key];
    }
  });
});