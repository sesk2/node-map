const Line = function() {};

makeCoordinates = function() {
  //var coordinates = [];
  var coordinates = [
    [139.767125, 35.681236],
    [139.769125, 35.670236],
    [139.763125, 35.670236]
  ];
  //cordinates.push(coordinate);

  return coordinates;
};


makeFeatures = function() {
  var features = [];
  var coordinates = makeCoordinates();
  var feature = {
    "type": "Feature",
    "geometry": {
      "type": "LineString",
      "coordinates": coordinates
    },
    "properties": {
      "popupContent": "This is a free bus line that will take you across downtown.",
      "style": {
        "color": "#999",
        "opacity": 2
      }
    },
    "id": 1
  };
  features.push(feature);

  return features;
};


Line.getLines = function() {
  var features = makeFeatures();

  //console.log(features);
  return JSON.stringify(features);
};

//var lines = Line.getLines();
//console.log(lines);

module.exports = Line;
