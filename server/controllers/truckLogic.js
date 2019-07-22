const mongoose = require('mongoose');
const FoodTruck = mongoose.model('FoodTruck');
const User = mongoose.model('User');

exports.getTruck = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    if (req.params.name) {
      const truckExists = await FoodTruck.findOne({ name: req.params.name });
      if (truckExists) {
        res.send(truckExists);
      } else {
        res.status(404).send({
          error: {
            message: 'Truck not found'
          }
        });
      }
    } else {
      res.status(400).send({
        error: {
          message: 'The name parameter is required'
        }
      });
    }
  } else {
    res.status(404).send({
      error: {
        message: 'User not found'
      }
    });
  }
};

exports.createTruck = async (req, res) => {
  const allowedParameters = [
    'name',
    'type',
    'website',
    'menu',
    'location',
    'lat',
    'long'
  ];
  const exists = await User.findById(req.user._id);
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
      const truckExists = await FoodTruck.findOne({ name: req.body.name });
      if (truckExists) {
        res.status(400).send({
          error: {
            message: 'Truck Already Exists'
          }
        });
      } else {
        const newTruck = await new FoodTruck({
          name: req.body.name,
          type: req.body.type,
          website: req.body.website || '',
          menu: req.body.menu || '',
          owner: req.user,
          location: {
            type: 'Point',
            coordinates: [req.body.lat, req.body.long]
          }
        }).save();
        res.send(newTruck);
      }
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

exports.deleteTruck = async (req, res) => {
  const exists = await User.findById(req.user._id);
  if (exists) {
    if (req.params.name) {
      const truckExists = await FoodTruck.findOne({ name: req.params.name });
      if (exists) {
        if (truckExists.owner._id == req.user._id) {
          await FoodTruck.findByIdAndDelete(truckExists._id);
          res.send({
            message: 'Truck Deleted'
          });
        } else {
          res.status(401).send({
            error: {
              message: 'Unauthorized'
            }
          });
        }
      } else {
        res.status(404).send({
          error: {
            message: 'Truck not found'
          }
        });
      }
    } else {
      res.send({
        error: {
          message: 'The name parameter is required'
        }
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
