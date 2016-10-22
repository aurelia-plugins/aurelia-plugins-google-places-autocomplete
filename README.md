# aurelia-plugins-google-places-autocomplete

A Google Places Autocomplete plugin for Aurelia.

## Installation

**Webpack/Aurelia CLI**

```shell
npm install aurelia-plugins-google-places-autocomplete --save
```

**JSPM**

```shell
jspm install aurelia-plugins-google-places-autocomplete
```

**Bower**

```shell
bower install aurelia-plugins-google-places-autocomplete
```

## Configuration

Add to `package.json`

```json
  "aurelia": {
    "build": {
      "resources": [
        "aurelia-plugins-google-places-autocomplete"
      ]
    }
  }
```

Inside of your `main.js` or `main.ts` file simply load the plugin inside of the configure method using `.plugin()`.

```javascript
export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use
    .plugin('aurelia-plugins-google-places-autocomplete', config => {
      config.options({
        apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded', // if loadApiScript is false, the event that is published to know when the Google Maps API is completely loaded
        key: '', // your Google API key retrieved from the Google Developer Console
        language: 'nl', // see https://developers.google.com/maps/documentation/javascript/localization
        libraries: 'places', // see https://developers.google.com/maps/documentation/javascript/libraries
        loadApiScript: true|false, // whether or not the <script> tag of the Google Maps API should be loaded
        options: { types: ['geocode'] } // see https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
      });
    });

    await aurelia.start();
    aurelia.setRoot('app');
}
```

## Usage

Once Google Places Autocomplete is configured, to use it simply add the custom element `<aup-google-places-autocomplete></aup-google-places-autocomplete>` in your view.

### Google API loaded

The `aurelia-plugins:google-places-autocomplete:api-script-loaded` event is published when the Google API Script is completely loaded.


### Get the place

To get the place information, subscribe to the event `aurelia-plugins:google-places-autocomplete:place-changed` in your viewmodel. The complete [`PlaceResult`](<https://developers.google.com/maps/documentation/javascript/places#place_details_results>) object from Google is returned.

```html
<aup-google-places-autocomplete></aup-google-places-autocomplete>
```

```javascript
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;

    this.eventAggregator.subscribe('aurelia-plugins:google-places-autocomplete:place-changed', place => {
    	console.log(place);
    });
  }
}
````

### Clear the place

To clear the input on the Google Places Autocomplete, publish the event `aurelia-plugins:google-places-autocomplete:clear`.

```javascript
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  onClick() {
    this.eventAggregator.publish('aurelia-plugins:google-places-autocomplete:clear');
  }
}
```

### Get the input value

If you place the Google Places Autocomplete in a form that will be submitted, no `Place` object will be returned. Bind the property `value` to `<aup-google-places-autocomplete></aup-google-places-autocomplete>` to get the value of the input. Use the Google Geocoder to convert the address into geographic coordinates.

```html
<form submit.delegate="onSubmit()">
  <aup-google-places-autocomplete bind.value="value"></aup-google-places-autocomplete>
  <button type="submit">Submit</button>
</form>
```

```javascript
export class App {
  value = null;
  
  async onSubmit() {
    var place = await this.geocode(this.value);
    console.log(place);
  }
  
  geocode(value) {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({ address: value }, (results, status) => {
        status === google.maps.GeocoderStatus.OK ? resolve(results[0]) : reject();
      });
    });
  }
}
```
