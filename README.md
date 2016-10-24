# aurelia-plugins-google-places-autocomplete

A Google Places Autocomplete plugin for Aurelia.

This plugin is a custom element build with the Google Places AutocompleteService instead of the Google Places Autocomplete class. You can use this plugin easily in a form and don't have to deal with the asynchronous `placed_changed` event. Simply bind a `value` to the element to get the value of the input in your form. The downside is that you still need to do your own geocoding if you want to have geographic coordinates of the address.

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


### Get the input value

Bind the `value` attribute to `<aup-google-places-autocomplete></aup-google-places-autocomplete>` to get the value selected from the Google Places AutocompleteService. Do your own geocoding if necessary. You can also easily validate the value with `aurelia-validation`.

```html
<form submit.delegate="onSubmit()">
  <aup-google-places-autocomplete bind.value="value"></aup-google-places-autocomplete>
  <button type="submit">Submit</button>
</form>
```

```javascript
export class App {
  value = '';
  
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

### Other parameters

The other parameters that can be used on `<aup-google-places-autocomplete></aup-google-places-autocomplete>` are:

* `placeholder`: The placeholder shown on the input.
* `itemClass`: The CSS class added to the listitem of the autocomplete when it isn't selected.
* `itemHoverClass`: The CSS class added to the listitem of the autocomplete when it is selected.
