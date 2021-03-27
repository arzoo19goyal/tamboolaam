const express = require('express');
const router = express.Router();

const {getAllItems, getItem, updateItem, deleteItem, insertItem} = require('../controllers/itemController');

router.post('/insertItem', insertItem);
router.get('/getAllItems', getAllItems);
router.get('/:id', getItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;