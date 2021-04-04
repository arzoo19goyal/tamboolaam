const express = require('express');
const router = express.Router();

const {getAllCategorys, getCategory, updateCategory, deleteCategory, insertCategory, insertCategorys} = require('../controllers/categoryController');

router.post('/insertCategory', insertCategory);
router.post('/insertCategories', insertCategorys);

router.get('/getAllCategories', getAllCategorys);
router.get('/:id', getCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;