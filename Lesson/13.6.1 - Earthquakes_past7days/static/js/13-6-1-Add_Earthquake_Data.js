// Add console.log to check to see if our code is working.
console.log("working");

// HERE we are creating the layers that we will pass to our layercontrol 
// layercontrol allows the user to pick which layer to display 
// We create the tile layer that will be the background of our map by shortening the code above
// rather than defining the ID ir style as a variable, we insert it directly into L.tilelayer
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps/layers
// this will be passed to our control.layers as options to choose which layer to display on the map
let baseMaps = {
    "Satellite Streets": satelliteStreets,
    "Streets": streets
  };

// Create the map object with center, zoom level and default layer.
// recall this is another syntax to create the map object rather than the methods above
// because we have created multiple layers to chosoe from, we will define the default map layer that loads in
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
// Next using control.layers we are able to add our array of map layers to be chosen between on our web page
L.control.layers(baseMaps).addTo(map);

// https://earthquake.usgs.gov/ contains our EarthQuake data
// navigate to the site --> then click on the "EarthQuake" link https://www.usgs.gov/natural-hazards/earthquake-hazards/earthquakes
// --> then "Real-time Notifications, Feeds, and Web Services" https://earthquake.usgs.gov/earthquakes/feed/
// --> then "GeoJSON Summary Feed" https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php
// --> then all Earthquakes from the past 7 days https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
// info on Earthquate data https://earthquake.usgs.gov/data/comcat/data-eventterms.php


// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});

