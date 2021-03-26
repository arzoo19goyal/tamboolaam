const express = require('express');
const router = express.Router();

const {getAllOrders, placedOrder, updateOrderStatus} = require('../controllers/orderController');

router.post('/orderPlaced', placedOrder);

router.get('/getAllOrders', getAllOrders);
router.post('/:order_id', updateOrderStatus);

module.exports = router;