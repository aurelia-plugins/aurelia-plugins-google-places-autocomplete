// IMPORTS
import {bindingMode} from 'aurelia-binding';
import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {bindable, customElement} from 'aurelia-templating';

import {Config} from './aurelia-plugins-google-places-autocomplete-config';


// CLASS ATTRIBUTES
@customElement('aup-google-places-autocomplete')
@inject(Element, Config, EventAggregator)


// PUBLIC CLASS
export class GooglePlacesAutocomplete {
  // PRIVATE PROPERTIES (DI)
  config;
  element;
  eventAggregator;

  // PRIVATE PROPERTIES (CUSTOM)
  scriptPromise = null;
  service = null;
  servicePromise = null;
  serviceResolve = null;

  // BINDABLE PROPERTIES
  @bindable placeholder = 'Enter a location';
  @bindable selectClass = 'bg-clouds';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  // PUBLIC PROPERTIES
  disabled = true;
  index = -1;
  predictions = [];
  selected = false;
  show = false;

  // CONSTRUCTOR
  constructor(element, config, eventAggregator) {
    this.config = config;
    this.element = element;
    this.eventAggregator = eventAggregator;
    if (!this.config.get('key')) return console.error('No Google API key has been specified.');
    this.servicePromise = new Promise(resolve => { this.serviceResolve = resolve; });
    if (this.config.get('loadApiScript')) { this.loadApiScript(); this.initialize(); return; }
    this.eventAggregator.subscribe(this.config.get('apiScriptLoadedEvent'), scriptPromise => { this.scriptPromise = scriptPromise; this.initialize(); });
  }

  // BINDABLE METHODS
  async valueChanged(newValue) {
    await this.servicePromise;
    if (!newValue) return this.clear();
    if (this.selected) return this.clear(true);
    const request = Object.assign({ input: newValue }, this.config.get('options'));
    this.service.getPlacePredictions(request, (predictions, status) => {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) return this.clear();
      this.predictions = predictions;
      this.show = true;
    });
  }

  // PUBLIC METHODS
  blur() {
    this.clear(true);
  }

  focus() {
    this.clear(true, true);
  }

  keydown(event) {
    if (this.selected) this.selected = false;
    if (!this.show) return true;
    switch (event.keyCode) {
      case 13:
        this.index !== -1 ? this.select(this.predictions[this.index], false) : this.show = false;
        setTimeout(() => this.element.firstElementChild.blur(), 100);
        break;
      case 27: this.show = false; break;
      case 38:
        this.index--;
        if (this.index < 0) this.index = 0;
        return false;
      case 40:
        this.index++;
        if (this.index >= this.predictions.length) this.index = this.predictions.length - 1;
        return false;
    }
    return true;
  }

  select(prediction, submit = true) {
    this.value = prediction.description;
    this.selected = true;
    if (submit) setTimeout(() => this.dispatchEvent(), 100);
    this.clear(true);
  }

  // PRIVATE METHODS
  clear(keep = false, show = false) {
    if (!keep) this.predictions = [];
    this.index = -1;
    this.show = show;
  }

  dispatchEvent() {
    if (!this.element.firstElementChild.form.attributes['submit.delegate']) return;
    let clickEvent;
    if (window.CustomEvent)
      clickEvent = new CustomEvent('submit', { bubbles: true, detail: event });
    else {
      clickEvent = document.createEvent('CustomEvent');
      clickEvent.initCustomEvent('submit', true, true, { data: event });
    }
    this.element.firstElementChild.form.dispatchEvent(clickEvent);
    this.element.firstElementChild.blur();
  }

  async initialize() {
    await this.scriptPromise;
    this.service = new window.google.maps.places.AutocompleteService();
    this.serviceResolve();
    this.disabled = false;
  }

  loadApiScript() {
    if (this.scriptPromise) return;
    if (window.google === undefined || window.google.maps === undefined) {
      const script = document.createElement('script');
      script.async = true;
      script.defer = true;
      script.src = `https://maps.googleapis.com/maps/api/js?callback=aureliaPluginsGooglePlacesAutocompleteCallback&key=${this.config.get('key')}&language=${this.config.get('language')}&libraries=${this.config.get('libraries')}`;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      this.scriptPromise = new Promise((resolve, reject) => {
        window.aureliaPluginsGooglePlacesAutocompleteCallback = () => {
          this.eventAggregator.publish('aurelia-plugins:google-places-autocomplete:api-script-loaded', this.scriptPromise);
          resolve();
        };
        script.onerror = error => reject(error);
      });
    }
    else if (window.google && window.google.maps)
      this.scriptPromise = new Promise(resolve => resolve());
  }
}