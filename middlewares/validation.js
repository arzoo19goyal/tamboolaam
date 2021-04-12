const {Order} = require('../models/order');
const {Restaurant} = require('../models/restaurant');
const {Item} = require('../models/item');
const {Subscription} = require('../models/subscription');
const {Category} = require('../models/category');
const {Cuisine} = require('../models/cuisine');
const {SwitchScreen} = require('../models/switchscreen');


const validateUser = async (req, res, next)=>{
    try{
        const user_type = req.body.user_type;
        const order_count = req.body.order_count;
        if(user_type !== 'driver' && order_count){
            return res.status(400).send({
                'error': {
                    'error': 'Invalid',
                    'message': `${user_type} cannot have order count`
                }
            })
        }

        if(user_type === 'driver' && order_count > 0){
            return res.status(400).send({
                'error': {
                    'error': 'Invalid',
                    'message': 'order count has to be zero for the new user'
                }
            })
        }

        next();
    } catch(e){
        next(e);
    }
}

const validatePlaceOrder = async(req, res, next)=>{
    try{
        const delivery_date = req.body.delivery_date;
        const order_date = req.body.order_date;

        let od = new Date(order_date);
        let ml = od.getMilliseconds();
        let s = od.getSeconds();
        s = "" + s + ml
        let orderDate = order_date - parseInt(s);

        let current_date = new Date();
        current_date_inms = current_date.getTime();
        let cms = current_date.getMilliseconds();
        let cs = current_date.getSeconds();
        cs = "" + cs +cms
        let currentDate = current_date - parseInt(cs);

        console.log(currentDate)
        console.log(orderDate)

        //check if order date is current date
        if(orderDate === currentDate){
            if(delivery_date < order_date){
                return res.status(400).send({
                    'error': {
                        'error': 'Invalid order date or delivery date',
                        'message': 'Order date cannot be after the delivery date'
                    }
                })
            }
        } else {
            return res.status(400).send({
                'error': {
                    'error': 'Invalid order date',
                    'message': 'Order date should be current date'
                }
            })
        }

        next();
    } catch(e){
        next(e);
    }
}

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

const validateUpdateOrder = async (req, res, next)=>{
    try{
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(400).send({
                'error': {
                    'message': `order with id: ${req.params.id} not found`
                }
            })
        }

        const id = req.body.id;
        if(id && id !== req.params.id){
            return res.status(400).send({
                'error': {
                    'error':'Invalid request',
                    "msg": '_id cannot be updated',
                    'code': 400,
                },
            })
        }

        const delivery_date = req.body.delivery_date;
        const order_date = req.body.order_date;

        let od = new Date(order_date);
        let ml = od.getMilliseconds();
        let s = od.getSeconds();
        s = "" + s + ml
        let orderDate = order_date - parseInt(s);

        let current_date = new Date();
        current_date_inms = current_date.getTime();
        let cms = current_date.getMilliseconds();
        let cs = current_date.getSeconds();
        cs = "" + cs +cms
        let currentDate = current_date - parseInt(cs);

        console.log(currentDate)
        console.log(orderDate)

        //check if order date is current date
        if(orderDate === currentDate){
            if(delivery_date < order_date){
                return res.status(400).send({
                    'error': {
                        'error': 'Invalid order date or delivery date',
                        'message': 'Order date cannot be after the delivery date'
                    }
                })
            }
        } else {
            return res.status(400).send({
                'error': {
                    'error': 'Invalid order date',
                    'message': 'Order date should be current date'
                }
            })
        }

        next();
    } catch(e){
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

const validateSwitchScreen = async (req, res, next) => {
    try {
        const switchscreen = await SwitchScreen.findById(req.params.id);
        if(!switchscreen){
            return res.status(400).send({
                'error': {
                    'message': `switchscreen with id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

const validateUpdate = async (req, res, next)=>{
    try{
        const id = req.body.id;
        if(id && id !== req.params.id){
            return res.status(400).send({
                'error': {
                    'error':'Invalid request',
                    "msg": '_id cannot be updated',
                    'code': 400,
                },
            })
        }
        next();
    } catch(e){
        next(e);
    }
}

module.exports = {
    validateUser,
    validateOrder,
    validatePlaceOrder,
    validateUpdateOrder,
    validateItem,
    validateRestaurant,
    validateSubscription,
    validateCategory,
    validateCuisine,
    validateSwitchScreen,
    validateUpdate,
}