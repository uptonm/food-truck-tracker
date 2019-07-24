// This class enforces a standard to the GeoLocation Model on the database,
// This implements the Geo-Json Point Schema
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Exporting the schema not the model, because we do not want
// to store a collection of geoJSON locations, we just want to
// apply structure to the data
const GeoLocation = new Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

module.exports = GeoLocation;
