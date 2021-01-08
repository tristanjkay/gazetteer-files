

        /*
        const layer = L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

const map = L.map("map", {
  layers: [layer]
}).setView([52.8203934, -4.5700609], 6);
applyCountryBorder(map, "United Kingdom");

function applyCountryBorder(map, countryname) {
  jQuery
    .ajax({
      type: "GET",
      dataType: "json",
      url:
        "https://nominatim.openstreetmap.org/search?country=" +
        countryname.trim() +
        "&polygon_geojson=1&format=json"
    })
    .then(function(data) {
      /*const latLngs = L.GeoJSON.coordsToLatLngs(data[0].geojson.coordinates,2) 
      L.polyline(latLngs, {
        color: "green",
        weight: 14,
        opacity: 1
      }).addTo(map);

      L.geoJSON(data[0].geojson, {
        color: "green",
        weight: 14,
        opacity: 1,
        fillOpacity: 0.0 
      }).addTo(map);
    });
}*/
        
  