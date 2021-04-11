const express = require('express');
const router = express.Router();

const {getAllOrders, placeOrder, updateOrder, deleteOrder, getOrder, placeOrders} = require('../controllers/orderController');
const { validateOrder, validateUpdateOrder, validatePlaceOrder } = require('../middlewares/validation');

router.post('/orderPlaced', validatePlaceOrder, placeOrder);

router.post('/bulkorderPlaced', placeOrders);

router.get('/getAllOrders', getAllOrders);

router.get('/:id', validateOrder, getOrder)

router.put('/:id', validateUpdateOrder, updateOrder);

router.delete('/:id', validateOrder, deleteOrder);


module.exports = router;