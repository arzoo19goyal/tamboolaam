const express = require('express');
const router = express.Router();

const {getAllOrders, placeOrder, updateOrder, deleteOrder, getOrder} = require('../controllers/orderController');

router.post('/orderPlaced', placeOrder);

router.get('/getAllOrders', getAllOrders);

router.get('/:id', getOrder)

router.put('/:id', updateOrder);

router.delete('/:id', deleteOrder);


module.exports = router;