// create a map object
var map = L.map("map", {
    center: [0, 0],
    zoom: 3
});

//API Key
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson').then(data => {

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: function (feature) {
            return {
                opacity: 1,
                fillOpacity: 1,
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: '#000000',
                radius: getRadius(feature.properties.mag),
                stroke: true,
                weight: 2
            };
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(
                `<h4>${feature.properties.place}<br>Magnitude: ${feature.properties.mag}<br>Depth: ${feature.geometry.coordinates[2]}</h4>`)
        }
    }).addTo(map);
});

function getColor(depth) {
    switch (true) {
        case depth > 90:
            return '#ea2c2c';
        case depth > 70:
            return '#ea822c';
        case depth > 50:
            return '#ee9c00';
        case depth > 30:
            return '#eecc00';
        case depth > 10:
            return '#d4ee00';
        default:
            return '#98ee00';
    };
};

function getRadius(mag) {
    if (mag == 0) {
        return 1;
    };
    return mag * 3;
};


