define(['exports', './aurelia-google-autocomplete'], function (exports, _aureliaGoogleAutocomplete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.keys(_aureliaGoogleAutocomplete).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function () {
        return _aureliaGoogleAutocomplete[key];
      }
    });
  });
});