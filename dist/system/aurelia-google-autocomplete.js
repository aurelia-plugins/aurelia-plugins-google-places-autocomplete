'use strict';

System.register(['./aurelia-google-autocomplete-config'], function (_export, _context) {
  "use strict";

  var Config;
  function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(Config);
    if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
    aurelia.globalResources('./aurelia-google-autocomplete-element');
  }

  _export('configure', configure);

  return {
    setters: [function (_aureliaGoogleAutocompleteConfig) {
      Config = _aureliaGoogleAutocompleteConfig.Config;
    }],
    execute: function () {}
  };
});