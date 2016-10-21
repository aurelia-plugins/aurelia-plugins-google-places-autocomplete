define(['exports', './aurelia-plugins-google-places-autocomplete'], function (exports, _aureliaPluginsGooglePlacesAutocomplete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaPluginsGooglePlacesAutocomplete).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaPluginsGooglePlacesAutocomplete[key];
      }
    });
  });
});