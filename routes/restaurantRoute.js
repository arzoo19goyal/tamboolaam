const express = require('express');
const router = express.Router();

const {getAllRestaurants, getRestaurant, insertRestaurant, upadteRestaurant, deleteRestaurant, insertRestaurants} = require('../controllers/restaurantController');

router.post('/insertRestaurant', insertRestaurant)

router.post('/insertRestaurants', insertRestaurants)

router.get('/getAllRestaurants', getAllRestaurants);

router.get('/:id', getRestaurant);

router.put('/:id', upadteRestaurant)

router.delete('/:id', deleteRestaurant)

module.exports = router;