'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _aureliaGoogleAutocomplete = require('./aurelia-google-autocomplete');

Object.keys(_aureliaGoogleAutocomplete).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaGoogleAutocomplete[key];
    }
  });
});