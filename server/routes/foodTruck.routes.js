const express = require('express');
const actions = require('../controllers/foodTruckLogic');
const router = express.Router();

router.get('/search', actions.search);

module.exports = router;
