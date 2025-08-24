# ngx-google-places-autocomplete-pr

This module is a wrapper for Google Places Autocomplete js library.

# Google API Warning Fixed
Google shows the following warning in console:

```
“As of March 1st, 2025, google.maps.places.Autocomplete is not available to new customers. Please use google.maps.places.PlaceAutocompleteElement instead.”
```
This package already fixes this by using PlaceAutocompleteElement internally

# Installation

#### npm

```
npm install ngx-google-places-autocomplete-pr
```

#### yarn

```
yarn add ngx-google-places-autocomplete-pr
```

# Integration

1. Add google library in your index.html file :

```
    <script src="https://maps.googleapis.com/maps/api/js?key=<Your API KEY>&libraries=places&language=en"></script>
```

2. Replace <You API KEY> with google places api key. Ref - https://developers.google.com/places/web-service/get-api-key

# Usage

1. Add a module into your application (as a rule app.module.ts)

```ts
import { GooglePlaceAutocompleteDirective } from "ngx-google-places-autocomplete-pr";

@Component({
     selector: 'app-root',
     imports: [GooglePlaceAutocompleteDirective, ...],
     templateUrl: './app.component.html',
     styleUrl: './app.component.scss'
        })
```

2. Add directive ngx-google-places-autocomplete-pr to your input field (options is an optional parammeter)

```
<input google-places-autocomplete [options]='options' #placesRef="ngx-places" (onAddressChange)="handleAddressChange($event)"/>
```

3. placeDataFields Input
The placeDataFields input lets you choose which fields to fetch from the Google Places API when a user selects a place.

```ts
<input
  google-places-autocomplete
  [options]="options"
  #placesRef="ngx-places"
  (onAddressChange)="handleAddressChange($event)"
  [placeDataFields]="['formattedAddress', 'location', 'displayName']"
/>
```
You can pass any combination of the fields listed in Google’s official documentation: https://developers.google.com/maps/documentation/javascript/place-class-data-fields

4. Additionally you can reference directive in your component

```ts
    @ViewChild("placesRef") placesRef : GooglePlaceAutocompleteDirective;

        public handleAddressChange(address: Address) {
        // Do some stuff
    }
```

## Angular Compatibility

| Angular Version | Package Version |
|-----------------|-----------------|
| 16.x            | 1.x.x           |
| 17.x            | 2.x.x           |
| 18.x            | 3.x.x           |
| 19.x            | 4.x.x (latest)  |

# GitHub

Please feel free to declare issues or contribute: https://github.com/puthubha/ngx-google-places-autocomplete-pr
