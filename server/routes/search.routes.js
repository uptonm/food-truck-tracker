const express = require('express');
const actions = require('../controllers/searchLogic');
const router = express.Router();

router.get('/search', actions.search);
router.get('/search/:id', actions.searchOne);

module.exports = router;
