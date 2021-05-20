// Add console.log to check to see if our code is working.
console.log("working");

// CREATE THE MAP OBJECT
// Create the map object with a center and zoom level, the layers is what creates the visualizations
// define the variable map and pass l.map function which creates the map under the 'mapid' tag
// .setview passes the latitude and longitude as well as the zoom of 4 on a scale from 1 to 18
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// This code does the same thing as the above but modifies each paramater, which is useful for multiple layers
// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
//    center: [
//      40.7, -94.5
//    ],
//    zoom: 4
//  });

// ADD MARKERS AND CIRCLES 
//  Add a marker to the map for Los Angeles, California.
// this passes the lat and long and uses .addto to add it to our map object 
let marker = L.marker([34.0522, -118.2437]).addTo(map);

// we can also add a circle for los angeles, and specify the radius of the circle in miles 
L.circle([34.0522, -118.2437], {
    radius: 100,
    color: "red",
    fillColor: '#f03'
 }).addTo(map)

// another function to create circles is to use circlemaker, except the radius is in terms of pixels
 L.circleMarker([34.0522, -118.2437], {
     radius: 300,
     color: "black",
     fillColor: '#ffffa1'   
 }).addTo(map);

// CREATE THE MAP LAYER
// We create the tile layer that will be the background of our map.
// using tileLayer we call the API that leaflet uses to create the tile layer, this creates the visuals 
// it uses the access token which is our API key for map box
//let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//    maxZoom: 18,
    //  in the ID we pass the "streets-v11" which tells it to use a street view, there are other options as well: https://docs.mapbox.com/api/maps/styles/
//    id: 'mapbox/streets-v11',
//    tileSize: 512,
//    zoomOffset: -1,
    // this looks to our config file for the api key
//    accessToken: API_KEY
//});
// Then we add our 'graymap' tile layer to the map using the .addto function 
//streets.addTo(map);


// We create the tile layer that will be the background of our map by shortening the code above
// rather than defining the ID ir style as a variable, we insert it directly into L.tilelayer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);