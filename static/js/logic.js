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

function Legend() {
    var mapLegend = L.control ({position: "bottomright"});
    mapLegend.onAdd = function (map) {
        var div = L.DomUtil.create("div", "Legend");
        div.innerHTML += '<h3>depth</h3>';
        div.innerHTML += '<i style="background: #98ee00"></i><span>0 - 10</span><br>';
          div.innerHTML += '<i style="background: #d4ee00"></i><span>11 - 29</span><br>';
          div.innerHTML += '<i style="background: #eecc00"></i><span>30 - 49</span><br>';
          div.innerHTML += '<i style="background: #ee9c00"></i><span>50 - 69</span><br>';
          div.innerHTML += '<i style="background: #ea822c"></i><span>70 - 89</span><br>';
          div.innerHTML += '<i style="background: #ea2c2c"></i><span>90 - 100</span><br>';
          div.innerHTML += '<i style="background: #ea2c2c"></i><span>100+</span><br>';
          return div;



        // var depth = [0,10,30,50,70,90];
        // var colors = ['#98ee00','#d4ee00','#eecc00','#ee9c00','#ea822c','#ea2c2c'];        
    //     for (var i; i < depth.length; i++)
    //         div.innerHTML += "<i style ='background:" + colors(depth[i] + 1) + "'></i> " + depth[i] + (depth[i + 1] ? "&ndash;" + depth[i + 1] + "<br>" : "+" );
    // }
    // return div; 
}
Legend.addTo(map);
};


