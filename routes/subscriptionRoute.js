const express = require('express');
const router = express.Router();

const {getAllSubscriptions, placedSubscription, updateSubscription, deleteSubscription, getSubscription} = require('../controllers/subscriptionController');

router.post('/subscriptionPlaced', placedSubscription);

router.get('/getAllSubscriptions', getAllSubscriptions);

router.get('/:id', getSubscription)

router.put('/updateSubscription/:id', updateSubscription);

router.delete('/deleteSubscription/:id', deleteSubscription);


module.exports = router;