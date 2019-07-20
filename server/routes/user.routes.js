const express = require('express');
const actions = require('../controllers/userLogic');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/user', actions.getUser);
router.put('/user', actions.putUser);
router.delete('/user', actions.deleteUser);

module.exports = router;
