const express = require('express');
const router = express.Router();

const {getAllItems, getItem, updateItem, deleteItem, insertItem} = require('../controllers/itemController');

router.post('/insertitem', insertItem);
router.get('/getallitems', getAllItems);
router.get('/getitem', getItem);
router.post('/updateitem', updateItem);
router.post('/deleteitem', deleteItem);

module.exports = router;