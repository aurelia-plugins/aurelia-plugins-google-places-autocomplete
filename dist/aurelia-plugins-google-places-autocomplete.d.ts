import {
  bindingMode
} from 'aurelia-binding';
import {
  inject
} from 'aurelia-dependency-injection';
import {
  EventAggregator
} from 'aurelia-event-aggregator';
import {
  bindable,
  customElement
} from 'aurelia-templating';

// PUBLIC CLASS
export declare class Config {
  
  // CONSTRUCTOR
  constructor();
  
  // PUBLIC METHODS
  get(key?: any): any;
  options(obj?: any): any;
  set(key?: any, value?: any): any;
}

// PUBLIC CLASS

// IMPORTS
// CLASS ATTRIBUTES
export declare class GoogleAutocomplete {
  value: any;
  
  // PUBLIC PROPERTIES
  disabled: any;
  
  // CONSTRUCTOR
  constructor(element?: any, config?: any, eventAggregator?: any);
}

// IMPORTS
// PUBLIC METHODS
export declare function configure(aurelia?: any, configCallback?: any): any;