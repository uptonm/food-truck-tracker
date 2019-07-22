const mongoose = require('mongoose');
const turf = require('@turf/turf');
const FoodTruck = mongoose.model('FoodTruck');

// /api/search?lat=124123&long=324322&rad=5
exports.search = async (req, res) => {
  if (req.query.lat && req.query.long && req.query.rad) {
    let userLocation = turf.point([req.query.lat, req.query.long]);
    let radius = req.query.rad;
    let options = { units: 'miles' };

    const foodTrucks = await FoodTruck.find({});
    let result = foodTrucks.filter(truck => {
      let foodTruck = turf.point([
        parseFloat(truck.location.coordinates[0]),
        parseFloat(truck.location.coordinates[1])
      ]);
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
