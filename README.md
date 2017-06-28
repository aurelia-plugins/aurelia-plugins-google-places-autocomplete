# aurelia-plugins-google-places-autocomplete

A Google Places Autocomplete plugin for Aurelia.

This plugin is a custom element build with the **Google Places AutocompleteService** instead of the Google Places Autocomplete class. You can use this plugin easily in a form and don't have to deal with the asynchronous `placed_changed` event. Simply bind a `value` to the element to get the value of the input in your form. The downside is that you still need to do your own geocoding if you want to have geographic coordinates of the address. Luckily, this can be easily done with the Google Geocoder.

Make sure you have the **Google Places API Web Service** activated in the Google API Console.

## Installation

**Webpack/Aurelia CLI**

```shell
npm install aurelia-plugins-google-places-autocomplete --save
```

Add `node_modules/babel-polyfill/dist/polyfill.min.js` to the prepend list in `aurelia.json`. Do not forgot to add `babel-polyfill` to the dependencies in `package.json`.

**JSPM**

```shell
jspm install aurelia-plugins-google-places-autocomplete
```

**Bower**

```shell
bower install aurelia-plugins-google-places-autocomplete
```

## Configuration

Inside of your `main.js` or `main.ts` file simply load the plugin inside of the configure method using `.plugin()`.

```javascript
export async function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  aurelia.use
    .plugin('aurelia-plugins-google-places-autocomplete', config => {
      config.options({
        apiScriptLoadedEvent: 'aurelia-plugins:google-maps:api-script-loaded', // if loadApiScript is false, the event that is subscribed to, to know when the Google Maps API is loaded by another plugin
        key: '', // your Google API key retrieved from the Google Developer Console
        language: 'nl', // see https://developers.google.com/maps/documentation/javascript/localization
        libraries: 'places', // see https://developers.google.com/maps/documentation/javascript/libraries
        loadApiScript: true|false, // whether or not the <script> tag of the Google Maps API should be loaded
        options: { types: ['geocode'] }, // see https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        region: 'US' // see https://developers.google.com/maps/documentation/javascript/localization#Region
      });
    });

    await aurelia.start();
    aurelia.setRoot('app');
}
```

## Usage

Once Google Places Autocomplete is configured, to use it simply add the custom element `<aup-google-places-autocomplete></aup-google-places-autocomplete>` in your view.

### Google Maps API loaded

The `aurelia-plugins:google-places-autocomplete:api-script-loaded` event is published when the Google Maps API Script is completely loaded. A Promise is returned as payload. This event is used together with other Aurelia Plugins in combination with the option `loadApiScript=false` to make sure the Google Maps API Script is loaded only once.

Google Places Autocomplete needs at least the library `places`. Perhaps the other Aurelia Plugin that loads the Google Maps API Script doesn't include the library `places` by default. If so, add it to the `libraries` option of the other Aurelia Plugin.

### Get the input value

Bind the `value` attribute to `<aup-google-places-autocomplete></aup-google-places-autocomplete>` to get the value selected from the Google Places AutocompleteService. Do your own geocoding if necessary. You can also easily validate the value with `aurelia-validation`.

```html
<form submit.delegate="onSubmit()">
  <aup-google-places-autocomplete value.bind="value"></aup-google-places-autocomplete>
  <button type="submit">Submit</button>
</form>
```

```javascript
export class App {
  value = '';

  constructor() {}

  async onSubmit() {
    const place = await this.geocode(this.value);
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

### Other attributes

The other attributes that can be used on `<aup-google-places-autocomplete></aup-google-places-autocomplete>` are:

* `placeholder`: The placeholder shown on the input.
* `selectClass`: The CSS class added to the selected item in the autocomplete when using up and down keys.

```html
<aup-google-places-autocomplete placeholder="Enter a location" selectClass="highlight" value.bind="value"></aup-google-places-autocomplete>
```