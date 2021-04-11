const express = require('express');
const router = express.Router();

const {getAllItems, getItem, updateItem, deleteItem, insertItem, insertItems} = require('../controllers/itemController');
const { validateItem, validateUpdate } = require('../middlewares/validation');

router.post('/insertItem', insertItem);
router.post('/insertItems', insertItems);

router.get('/getAllItems', getAllItems);
router.get('/:id', validateItem, getItem);
router.put('/:id', validateItem, validateUpdate, updateItem);
router.delete('/:id', validateItem, deleteItem);

module.exports = router;