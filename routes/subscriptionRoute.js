const express = require('express');
const router = express.Router();

const {getAllSubscriptions, placedSubscription, updateSubscription, deleteSubscription, getSubscription} = require('../controllers/subscriptionController');
const { validateSubscription } = require('../middlewares/validation');

router.post('/subscriptionPlaced', placedSubscription);

router.get('/getAllSubscriptions', getAllSubscriptions);

router.get('/:id', validateSubscription, getSubscription)

router.put('/updateSubscription/:id', validateSubscription, updateSubscription);

router.delete('/deleteSubscription/:id', validateSubscription, deleteSubscription);


module.exports = router;