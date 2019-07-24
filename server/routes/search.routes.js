// This class handles the routing for searching within a radius, and getting a particular trucks information
const express = require('express');
const actions = require('../controllers/searchLogic');
const router = express.Router();

router.get('/search', actions.search);
router.get('/search/:id', actions.searchOne);

module.exports = router;
