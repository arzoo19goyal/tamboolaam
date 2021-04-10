/* eslint-disable linebreak-style */
const router = require('express').Router();

const sampleRoute = require('./routes/sampleRoute');
const userRoutes = require('./routes/userRoute');
const orderRoutes = require('./routes/orderRoute');
const itemRoutes = require('./routes/itemRoute');
const subscriptionRoutes = require('./routes/subscriptionRoute');
const restaurantRoutes = require('./routes/restaurantRoute');
const cuisineRoutes = require('./routes/cuisineRoute');
const categoryRoutes = require('./routes/categoryRoute');
const switchScreenRoutes = require('./routes/switchScreenRoute');


router.use('/v1/sample', sampleRoute);
router.use('/v1/cuisine', cuisineRoutes);
router.use('/v1/category', categoryRoutes);
router.use('/v1/switchScreen', switchScreenRoutes);
router.use('/v1/user', userRoutes);
router.use('/v1/order', orderRoutes);
router.use('/v1/item', itemRoutes);
router.use('/v1/restaurant', restaurantRoutes);
router.use('/v1/subscription', subscriptionRoutes);


module.exports = router;
