const mongoose = require('mongoose');
const turf = require('@turf/turf');
const { foodTrucks } = require('../assets/sampleData.json');
const FoodTruck = mongoose.model('FoodTruck');

// /api/search?lat=124123&long=324322&rad=5
exports.search = async (req, res) => {
  if (req.query.lat && req.query.long && req.query.rad) {
    let userLocation = turf.point([req.query.lat, req.query.long]);
    let radius = req.query.rad;
    let options = { units: 'miles' };

    let result = foodTrucks.filter(({ lat, long }) => {
      let foodTruck = turf.point([parseFloat(lat), parseFloat(long)]);
      return turf.distance(userLocation, foodTruck, options) <= radius;
    });
    res.send(result);
  } else {
    res.status(400).send({
      error: {
        message: 'The following parameters are required for this route',
        parameters: ['lat', 'long', 'rad']
      }
    });
  }
};
