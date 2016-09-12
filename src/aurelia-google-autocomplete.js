// IMPORTS
import {Config} from './aurelia-google-autocomplete-config';
import {GoogleAutocomplete} from './aurelia-google-autocomplete-class';


// PUBLIC METHODS
export function configure(aurelia, configCallback) {
  var instance = aurelia.container.get(Config);
  if (configCallback !== undefined && typeof(configCallback) === 'function')
    configCallback(instance);
  aurelia.globalResources('./aurelia-google-autocomplete-class');
}


// PUBLIC CLASSES
export {Config};
export {GoogleAutocomplete}
