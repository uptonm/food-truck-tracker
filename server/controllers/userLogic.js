// This class handles the logic behind creating, viewing, updating, and deleting user accounts
const mongoose = require('mongoose');
const User = mongoose.model('User');
const geoLocation = require('../models/geoLocation');

exports.getUser = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    res.status(200).send(exists);
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};

exports.putUser = async (req, res) => {
  const allowedParameters = ['first', 'last'];
  const exists = await User.findById(req.user._id);
  // User exists, check for body of request to make update
  if (exists) {
    // Loop through keys of body, populate array with values that arnt on the param whitelist
    let bannedParameters = Object.keys(req.body).filter(
      param => !allowedParameters.includes(param)
    );
    if (bannedParameters.length > 0) {
      res.status(400).send({
        error: {
          // eslint-disable-next-line-quotes
          message: 'The following parameters are not allowed at this endpoint',
          parameters: bannedParameters
        }
      });
    } else {
      await User.findByIdAndUpdate(exists._id, req.body);
      res.send({
        user: exists._id,
        update: req.body
      });
    }
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};

exports.deleteUser = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    await User.findByIdAndDelete(exists._id);
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};

exports.updateLocation = async (req, res) => {
  const allowedParameters = ['lat', 'long'];
  const exists = await User.findById(req.user._id);
  // User exists, check for body of request to make update
  if (exists) {
    // Loop through keys of body, populate array with values that arnt on the param whitelist
    let bannedParameters = Object.keys(req.body).filter(
      param => !allowedParameters.includes(param)
    );
    if (bannedParameters.length > 0) {
      res.status(400).send({
        error: {
          // eslint-disable-next-line-quotes
          message: 'The following parameters are not allowed at this endpoint',
          parameters: bannedParameters
        }
      });
    } else {
      await User.findByIdAndUpdate(exists._id, {
        location: {
          type: 'Point',
          coordinates: [req.body.lat, req.body.long]
        }
      });
      res.send({
        user: exists._id,
        update: req.body
      });
    }
  } else {
    res.status(404).send({
      error: {
        // eslint-disable-next-line quotes
        message: "Couldn't find your profile. Try again later."
      }
    });
  }
};
