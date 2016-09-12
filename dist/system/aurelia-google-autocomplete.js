'use strict';

System.register(['./aurelia-google-autocomplete-config', './aurelia-google-autocomplete-class'], function (_export, _context) {
  "use strict";

  var Config, GoogleAutocomplete;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-google-autocomplete-class');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaGoogleAutocompleteConfig) {
      Config = _aureliaGoogleAutocompleteConfig.Config;
    }, function (_aureliaGoogleAutocompleteClass) {
      GoogleAutocomplete = _aureliaGoogleAutocompleteClass.GoogleAutocomplete;
    }],
    execute: function () {
      _export('Config', Config);

      _export('GoogleAutocomplete', GoogleAutocomplete);
    }
  };
});