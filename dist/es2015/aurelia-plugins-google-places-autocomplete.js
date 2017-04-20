
import { Config } from './aurelia-plugins-google-places-autocomplete-config';

export function configure(aurelia, configCallback) {
  const instance = aurelia.container.get(Config);
  if (configCallback !== undefined && typeof configCallback === 'function') configCallback(instance);
  aurelia.globalResources('./aurelia-plugins-google-places-autocomplete-converter', './aurelia-plugins-google-places-autocomplete-element');
}