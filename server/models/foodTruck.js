const mongoose = require('mongoose');
const GeoLocation = require('./geoLocation');
const { Schema } = mongoose;

const FoodTruckSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  location: {
    type: GeoLocation,
    required: true
  }
});

const FoodTruckModel = mongoose.model('FoodTruck', FoodTruckSchema);

module.exports = FoodTruckModel;
