mapboxgl.accessToken = "pk.eyJ1IjoicmFodWw4MjYyOTIiLCJhIjoiY20zOHFxeDJlMG53YzJsc2UwZjJuMWxrciJ9.eWmmKUI56wwodn6qMrCiYw";

let coordinates = JSON.parse(document.getElementById('coordinates').value);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});

const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .addTo(map);

const popup = new mapboxgl.Popup({ offset: 25 })
    .setHTML("<h3>exact location after booking</h3>")
    .addTo(map);
