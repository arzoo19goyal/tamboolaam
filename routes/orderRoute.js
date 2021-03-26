const express = require('express');
const router = express.Router();

const {getAllOrders, placedOrder, updateOrder, deleteOrder, getOrder} = require('../controllers/orderController');

router.post('/orderPlaced', placedOrder);

router.get('/getAllOrders', getAllOrders);

router.get('/:id', getOrder)

router.post('/updateOrder', updateOrder);

router.post('/deleteOrder', deleteOrder);


module.exports = router;