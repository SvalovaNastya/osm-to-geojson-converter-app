# OSM to GeoJSON App

This page collects the coordinates, makes call to the OSM
api, converts the data into GeoJSON features and show them
on the map.

## How to run

Download the app

Create the file `.env` in the project root folder and
populate it with:
- `BASE_API` - base osm api url 
- `TILE_URL_TEMPLATE` - url template for download osm tile

i.e.
```
BASE_API = https://master.apis.dev.openstreetmap.org/
TILE_URL_TEMPLATE = https://tile.openstreetmap.org/{z}/{x}/{y}.png
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run lint`

Launches the linter.

### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
