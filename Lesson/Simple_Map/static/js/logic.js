// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level, the layers is what creates the visualizations
// define the variable map and pass l.map function which creates the map under the 'mapid' tag
// .setview passes the latitude and longitude as well as the zoom of 4 on a scale from 1 to 18
let map = L.map('mapid').setView([40.7, -94.5], 4);

// This code does the same thing as the above but modifies each paramater, which is useful for multiple layers
// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
//    center: [
//      40.7, -94.5
//    ],
//    zoom: 4
//  });

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
// rather than defining the ID as a variable, we insert it directly into L.tilelayer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);