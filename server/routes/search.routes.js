const express = require('express');
const actions = require('../controllers/searchLogic');
const router = express.Router();

router.get('/search', actions.search);

module.exports = router;
