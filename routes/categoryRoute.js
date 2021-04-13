const express = require('express');
const router = express.Router();

const {getAllCategorys, getCategory, updateCategory, deleteCategory, insertCategory, insertCategorys} = require('../controllers/categoryController');
const { validateCategory, validateUpdate } = require('../middlewares/validation');

router.post('/insertCategory', insertCategory);
router.post('/insertCategories', insertCategorys);

router.get('/getAllCategories', getAllCategorys);
router.get('/:id', validateCategory, getCategory);
router.put('/:id', validateCategory, validateUpdate, updateCategory);
router.delete('/:id', validateCategory, deleteCategory);

module.exports = router;