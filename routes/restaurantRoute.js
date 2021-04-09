const express = require('express');
const router = express.Router();

const {getAllRestaurants, getRestaurant, insertRestaurant, upadteRestaurant, deleteRestaurant, insertRestaurants} = require('../controllers/restaurantController');
const { validateRestaurant } = require('../middlewares/validation');

router.post('/insertRestaurant', insertRestaurant)

router.post('/insertRestaurants', insertRestaurants)

router.get('/getAllRestaurants', getAllRestaurants);

router.get('/:id', validateRestaurant, getRestaurant);

router.put('/:id', validateRestaurant, upadteRestaurant)

router.delete('/:id', validateRestaurant, deleteRestaurant)

module.exports = router;