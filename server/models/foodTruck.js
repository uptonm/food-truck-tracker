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
  description: {
    type: String,
    required: false
  },
  website: {
    type: String,
    required: false
  },
  menu: {
    type: String,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: GeoLocation,
    required: false
  }
});

const FoodTruckModel = mongoose.model('FoodTruck', FoodTruckSchema);

module.exports = FoodTruckModel;
