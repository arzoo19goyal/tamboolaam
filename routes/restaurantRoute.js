const express = require('express');
const router = express.Router();

const {getAllRestaurants} = require('../controllers/restaurantController');

router.get('/getAllRestaurants', getAllRestaurants);

module.exports = router;