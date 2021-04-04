const express = require('express');
const router = express.Router();

const {getAllCuisines, getCuisine, updateCuisine, deleteCuisine, insertCuisine, insertCuisines} = require('../controllers/cuisineController');

router.post('/insertCuisine', insertCuisine);
router.post('/insertCuisines', insertCuisines);

router.get('/getAllCuisines', getAllCuisines);
router.get('/:id', getCuisine);
router.put('/:id', updateCuisine);
router.delete('/:id', deleteCuisine);

module.exports = router;