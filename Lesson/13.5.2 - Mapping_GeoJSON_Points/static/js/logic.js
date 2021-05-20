// Add console.log to check to see if our code is working.
console.log("working");

// CREATE THE MAP OBJECT
// Create the map object with a center and zoom level, the layers is what creates the visualizations
// define the variable map and pass l.map function which creates the map under the 'mapid' tag
// .setview passes the latitude and longitude as well as the zoom of 4 on a scale from 1 to 18
// this centers it to San Fran
//let map = L.map('mapid').setView([37.5, -122.5], 10);
// set the view to the center of the world 
//let map = L.map('mapid').setView([30, 30], 2);

// Grabbing our GeoJSON data and add it to the map which we have set to be central to San Fran
// L.geoJson also automatically creates the marker 
//L.geoJSON(sanFranAirport).addTo(map);

// Alternatively, we can grab our GeoJSON data and add a marker using pointToLayer
// first specify our GeoJson data
L.geoJson(sanFranAirport, {
    // We turn each feature into a marker on the map.
    // pointToLayer is call back function which call a function() which takes each GeoJSON feature as feature
    // and will take its lat and long as latlng
    pointToLayer: function(feature, latlng) {
    // we can see that it is looking through our sanFranAirport array
      console.log(feature);
      return L.marker(latlng)
      // next we can use .bindPopup and dot object notation to retreive the location name, and city/country
      .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country ,"</h3>");
    }
  })//.addTo(map);

// We can also use onEachFeature to accomplish the same thing
// first we tell geoJson what our data is 
  L.geoJson(sanFranAirport, {
    // our onEachFeature calls an anonymous function which ttakes each GeoJSON feature as feature 
   onEachFeature: function(feature, layer) {
    // we can see that the layer returns even more JavaScript info 
    console.log(layer)
    layer.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country ,"</h3>");
    }
})//.addTo(map);

// HERE we are creating the layers that we will pass to our layercontrol 
// layercontrol allows the user to pick which layer to display 
// We create the tile layer that will be the background of our map by shortening the code above
// rather than defining the ID ir style as a variable, we insert it directly into L.tilelayer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps/layers
// this will be passed to our control.layers as options to choose which layer to display on the map
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
// recall this is another syntax to create the map object rather than the methods above
// because we have created multiple layers to chosoe from, we will define the default map layer that loads in
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
// Next using control.layers we are able to add our array of map layers to be chosen between on our web page
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL which we have uploaded to our GitHub repository 
let airportData = "https://raw.githubusercontent.com/BBBrian1124/Mapping_Earthquakes/main/Lesson/majorAirports.json";

// Grabbing our GeoJSON data
// recall the .then method doesn't contine to the next line of code until the data is retreived 
// we use d3.json() to obtain the airportData above, then pass a function that takes the data paramater
d3.json(airportData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data and add it to the map
  L.geoJson(data, {
      // we can pass the onEachFeature to print popups and call the info we want with the dot object notation
    onEachFeature: function(feature, layer) {
    console.log(layer)
    layer.bindPopup("<h2> Airport Code: " + feature.properties.faa + "</h2> <hr> <h3> Airport Name: " + feature.properties.name , "</h3>");
    }
  }).addTo(map)
});

