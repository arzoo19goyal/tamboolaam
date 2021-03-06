const express = require('express');
const router = express.Router();

const { getAllCuisines, getCuisine, updateCuisine, deleteCuisine, insertCuisine, insertCuisines } = require('../controllers/cuisineController');
const { validateCuisine, validateUpdate } = require('../middlewares/validation');

router.post('/insertCuisine', insertCuisine);
router.post('/insertCuisines', insertCuisines);

router.get('/getAllCuisines', getAllCuisines);
router.get('/:id', validateCuisine, getCuisine);
router.put('/:id', validateCuisine, validateUpdate, updateCuisine);
router.delete('/:id', validateCuisine, deleteCuisine);

module.exports = router;