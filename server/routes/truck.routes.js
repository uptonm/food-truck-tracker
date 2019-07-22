const express = require('express');
const actions = require('../controllers/truckLogic');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/truck/:name', actions.getTruck);
router.delete('/truck/:name', actions.deleteTruck);
router.post('/truck', actions.createTruck);

module.exports = router;
