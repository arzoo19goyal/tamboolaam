const express = require('express');
const router = express.Router();

const {getAllRestaurants, getRestaurant, insertRestaurant, upadteRestaurant, deleteRestaurant} = require('../controllers/restaurantController');

router.post('/invokeRestaurant', insertRestaurant)

router.get('/getAllRestaurants', getAllRestaurants);

router.get('/:id', getRestaurant);

router.post('/updateRestaurant', upadteRestaurant)

router.post('/deleteRestaurant', deleteRestaurant)

module.exports = router;