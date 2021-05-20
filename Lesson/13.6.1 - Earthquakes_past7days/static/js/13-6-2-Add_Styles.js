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


// Retrieve the earthquake GeoJSON data from the URL 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

// This function returns the style data for each of the earthquakes we plot on the map. 
// We pass the magnitude of the earthquake into a function to calculate the radius.
// here we pass the feature element which will take each feature from our json file
function styleInfo(feature) {
  // we return the variables/paramaters for the style 
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: "#ffae42",
    color: "#000000",
    // this is a function we will use to obtain the earthquakes magnitude 
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
// we pass the magnitutde value to the function, and if it is 0 then return 1 otherwise * by 4
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 4;
}
  // Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
  // We turn each feature into a circleMarker on the map using pointToLayer
  pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng);
          },
          // we can pass our style function as the style paramater since it returns all of the needed paramaters
          style: styleInfo
      }).addTo(map);
  });
