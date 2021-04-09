const express = require('express');
const router = express.Router();

const {getAllOrders, placeOrder, updateOrder, deleteOrder, getOrder, placeOrders} = require('../controllers/orderController');
const { validateOrder } = require('../middlewares/validation');

router.post('/orderPlaced', placeOrder);

router.post('/bulkorderPlaced', placeOrders);

router.get('/getAllOrders', getAllOrders);

router.get('/:id', validateOrder, getOrder)

router.put('/:id', validateOrder, updateOrder);

router.delete('/:id', validateOrder, deleteOrder);


module.exports = router;