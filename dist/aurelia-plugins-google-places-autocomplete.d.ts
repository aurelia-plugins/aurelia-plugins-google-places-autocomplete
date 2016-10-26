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
export declare class HighlightValueConverter {
  
  // INTERFACE METHODS
  toView(array?: any): any;
}

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
export declare class GooglePlacesAutocomplete {
  placeholder: any;
  selectClass: any;
  value: any;
  
  // PUBLIC PROPERTIES
  disabled: any;
  index: any;
  predictions: any;
  selected: any;
  show: any;
  
  // CONSTRUCTOR
  constructor(element?: any, config?: any, eventAggregator?: any);
  
  // BINDABLE METHODS
  valueChanged(newValue?: any): any;
  
  // PUBLIC METHODS
  blur(): any;
  focus(): any;
  keydown(event?: any): any;
  select(prediction?: any, submit?: any): any;
}

// IMPORTS
// PUBLIC METHODS
export declare function configure(aurelia?: any, configCallback?: any): any;