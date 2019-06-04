const express = require('express');
const passport = require('passport');
const actions = require('../controllers/authLogic');

const router = express.Router();

//When the user sends a post request to this route, passport authenticates the user based on the
//middleware created previously
router.post(
  '/signup',
  passport.authenticate('signup', { session: false }),
  actions.signup
);

router.post('/login', actions.login);

module.exports = router;
