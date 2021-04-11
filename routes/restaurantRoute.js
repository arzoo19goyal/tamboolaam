const express = require('express');
const router = express.Router();

const {getAllRestaurants, getRestaurant, insertRestaurant, upadteRestaurant, deleteRestaurant, insertRestaurants} = require('../controllers/restaurantController');
const { validateRestaurant, validateUpdate } = require('../middlewares/validation');

router.post('/insertRestaurant', insertRestaurant)

router.post('/insertRestaurants', insertRestaurants)

router.get('/getAllRestaurants', getAllRestaurants);

router.get('/:id', validateRestaurant, getRestaurant);

router.put('/:id', validateRestaurant, validateUpdate, upadteRestaurant)

router.delete('/:id', validateRestaurant, deleteRestaurant)

module.exports = router;