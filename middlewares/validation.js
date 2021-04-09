const {Order} = require('../models/order');
const {Restaurant} = require('../models/restaurant');
const {Item} = require('../models/item');
const {Subscription} = require('../models/subscription');
const {Category} = require('../models/category');
const {Cuisine} = require('../models/cuisine');


const validateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(400).send({
                'error': {
                    'message': `order with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if(!item){
            return res.status(400).send({
                'error': {
                    'message': `item with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if(!restaurant){
            return res.status(400).send({
                'error': {
                    'message': `restaurant with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            return res.status(400).send({
                'error': {
                    'message': `subscription with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            return res.status(400).send({
                'error': {
                    'message': `category with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateCuisine = async (req, res, next) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id);
        if(!cuisine){
            return res.status(400).send({
                'error': {
                    'message': `cuisine with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    validateOrder,
    validateItem,
    validateRestaurant,
    validateSubscription,
    validateCategory,
    validateCuisine
}