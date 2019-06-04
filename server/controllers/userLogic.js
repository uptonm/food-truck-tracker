const mongoose = require('mongoose');
const User = mongoose.model('User');

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
