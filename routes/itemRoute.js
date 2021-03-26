const express = require('express');
const router = express.Router();

const {getAllItems, getItem, updateItem, deleteItem, insertItem} = require('../controllers/itemController');

router.get('/insertItem', insertItem);
router.get('/getAllItems', getAllItems);
router.get('/getItem', getItem);
router.get('/updateItem', updateItem);
router.get('/deleteItem', deleteItem);

module.exports = router;