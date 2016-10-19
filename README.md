# aurelia-google-autocomplete

A Google Autocomplete plugin for Aurelia.

## Installation

**Webpack/Aurelia CLI**

```shell
npm install aurelia-google-autocomplete --save
```

**JSPM**

```shell
jspm install aurelia-google-autocomplete
```

**Bower**

```shell
bower install aurelia-google-autocomplete
```

## Configuration

Add to `package.json`

```json
  "aurelia": {
    "build": {
      "resources": [
        "aurelia-google-autocomplete"
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
    .plugin('aurelia-google-autocomplete', config => {
      config.options({
        apiKey: '', // your API key retrieved from the Google Developer Console
        apiLibraries: 'places', // https://developers.google.com/maps/documentation/javascript/libraries
        apiLoadedEvent: 'googlemap:api:loaded', // if you don't load the Google Maps API script, the event that is triggered to know when the API is loaded
        language: 'nl', //https://developers.google.com/maps/documentation/javascript/localization
        loadApiScript: true|false, // whether or not the <script> tag to the Google Maps API should be loaded
        options: { types: ['geocode'] } // https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
      });
    });

    await aurelia.start();
    aurelia.setRoot('app');
}
```

## Usage

Once Google Autocomplete is configured, to use it simply add the custom element `<google-autocomplete></google-autocomplete>` in your view.

### Google API loaded

The `google-autocomplete:api_loaded` event is published when the Google API is completely loaded.


### Get the place

To get the place information, subscribe to the event `google-autocomplete:place_changed` in your viewmodel. The complete [`PlaceResult`](https://developers.google.com/maps/documentation/javascript/places#place_details_results) object from Google is returned.

```html
<google-autocomplete></google-autocomplete>
```

```javascript
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';

@inject(EventAggregator)
export class App {
  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
  }

  attached() { 
    this.eventAggregator.subscribe('google-autocomplete:place_changed', place => {
    	console.log(place);
    });
  }
}
````
