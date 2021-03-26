/* eslint-disable linebreak-style */
const router = require('express').Router();

const sampleRoute = require('./routes/sampleRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const itemRoutes = require('./routes/itemRoute');
const restaurantRoutes = require('./routes/restaurantRoute');


router.use('/v1/sample', sampleRoute);
router.use('/v1/user', userRoutes);
router.use('/v1/order', orderRoutes);
router.use('/v1/items', itemRoutes);
router.use('/v1/restaurant', restaurantRoutes);


module.exports = router;
