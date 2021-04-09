const { Subscription } = require('../models/subscription');
const { Order } = require('../models/order');
const { ApiGatewayManagementApi } = require('aws-sdk');

const placedSubscription = async (req, res, next) => {
    try {
        var body = req.body;
        var order = body.order;
        var deliveryDates = body.delivery_dates;
        delete body['order'];
        delete body['delivery_dates'];
        body.start_date = deliveryDates[0];
        body.end_date = deliveryDates[deliveryDates.length - 1];
        const subscription = await new Subscription(body);
        await subscription.save();
        var noOfWeeks = Number(req.body.recurring_period) * (req.body.recurring_unit == 'month' ? 4 : 1);
        var noOfOrders = Number(req.body.recurring_frequency) * noOfWeeks;
        if (noOfOrders != deliveryDates.length) {
            return res.status(400).send({
                'response': {
                    'success': false,
                    'message': "add all delivery dates",
                    'subscription': subscription
                }
            })
        }
        var orders = [];

        for (let i = 0; i < noOfOrders; i++) {
            order.delivery_date = deliveryDates[i];
            order.subscription_id = subscription._id;
            order.delivery_address = subscription.delivery_address;
            order.user_phone = subscription.user_phone;
            order.user_name = subscription.user_name;
            order.order_type = "subscription";
            order.delivery_type = "delivery";
            order.order_sub_type = subscription.subscription_type;
            order.restaurant_name = subscription.restaurant_name;
            order.restaurant_id = subscription.restaurant_id;
            orders.push(order);
        }
        await Order.insertMany(orders);
        return res.status(200).send({
            'response': {
                'success': true,
                'message': "subscription added",
                'subscription': subscription
            }
        })
    } catch (ex) {
        next(ex);
    }
}


const getAllSubscriptions = async (req, res, next) => {
    try {
        const page = Number(req.query.limit) * ((req.query.page) - 1) || 0;
        const limit = Number(req.query.limit) || 10;
        var query = {}
        if (req.query.status) {
            query.status = req.query.status
        }
        if (req.query.subscription_type) {
            query.subscription_type = req.query.subscription_type
        }
        if (req.query.subscription_sub_type) {
            query.subscription_sub_type = req.query.subscription_sub_type
        }
        if (req.query.user_id) {
            query.user_id = req.query.user_id
        }
        if (req.query.restaurant_id) {
            query.restaurant_id = req.query.restaurant_id
        }
        if (req.query.driver_id) {
            query.driver_id = req.query.driver_id
        }
        if (req.query.recurring_type) {
            query.recurring_type = req.query.recurring_type
        }

        const allSubscriptions = await Subscription.find(query).skip(page).limit(limit);
        var count = await Order.count(query);
        if (allSubscriptions) {
            console.log(allSubscriptions);
            return res.status(200).send({
                'response': {
                    'message': "allSubscriptions",
                    'subscription': allSubscriptions,
                    'count': count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no subscriptions"
                }
            })
        }
    } catch (e) {
        next(e)
    }
}

const getSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        return res.status(200).send({
            'response': {
                'message': subscription
            }
        })
    } catch (e) {
        next(e);
    }
}

const updateSubscription = async (req, res, next) => {
    try {
        const update = await Subscription.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).send({
            'response': {
                'message': "Subscription updated successfully",
                'result': update
            }
        })
    } catch (e) {
        next(e);
    }
}

const deleteSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findOneAndDelete({ _id: req.params.id });
        return res.status(200).send({
            'response': {
                'message': 'Subscription deleted'
            }
        })
    } catch (e) {
        next(e);
    }
}

module.exports = {
    placedSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription
}