const {Order} = require('../models/order');

const placeOrder = async (req, res, next)=>{
    try{
        const order = await new Order(req.body);
        await order.save();
        return res.status(200).send({
            'response': {
                'order': order,
            }
        })
    } catch(e){
        next(e);
    }
}

const placeOrders = async (req, res, next)=>{
    try{
        const body = req.body;
        let orders = body.orders
        let multipleOrders = await Order.insertMany(orders)
       return res.status(200).send({
            'response': {
                'order': multipleOrders
            }
        })
    } catch(ex){
        next(ex);
    }
}


const getAllOrders = async (req, res, next) => {
    try {
        const page = Number(req.query.limit)*((req.query.page)-1) || 0;
        const limit = Number(req.query.limit) || 10;
        var query = {}
        if(req.query.order_type){
            query.order_type=req.query.order_type
        }
        if(req.query.status){
            query.status=req.query.status
        }
        if(req.query.order_sub_type){
            query.order_sub_type=req.query.order_sub_type
        }
        if(req.query.subscription_id){
            query.subscription_id=req.query.subscription_id
        }
        if(req.query.user_id){
            query.user_id=req.query.user_id
        }
        if(req.query.restaurant_id){
            query.restaurant_id=req.query.restaurant_id
        }
        if(req.query.delivery_type){
            query.delivery_type=req.query.delivery_type
        }
        if(req.query.driver_id){
            query.driver_id=req.query.driver_id
        }
        if(req.query.start_date && req.query.end_date){
            let start_date = Number(req.query.start_date);
            let end_date = Number(req.query.end_date);
            query.order_date = {$gte: start_date,$lte: end_date};
        }
        if(req.query.start_date && !req.query.end_date){
            let start_date = Number(req.query.start_date);
            query.order_date = {$gte: start_date};
        }
        if(req.query.end_date && !req.query.start_date){
            let end_date = Number(req.query.end_date);
            query.order_date = {$lte: end_date};
        }
        console.log(query)
        const allOrders = await Order.find(query).skip(page).limit(limit);
        var count = await Order.count(query);
        if(allOrders){
            console.log(allOrders);
             return res.status(200).send({
                'response': {
                    'message': "allOrders",
                    'order': allOrders,
                    "count":count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no orders"
                }
            })
        }
    } catch(e){
        next(e)
    }
}

const getOrder = async (req, res, next)=> {
    try{
        const order = await Order.findById(req.params.id);
        return res.status(200).send({
            'response': {
                'message': order
            }
        })
    } catch(e) {
        next(e);
    }
}

const updateOrder = async (req, res, next)=>{
    try{
        const update = await Order.findByIdAndUpdate(req.params.id, { $set:req.body}, {new: true});
        return res.status(200).send({
            'response':{
                'message': 'Order updated successfully',
                'result': update
            }
        })
    } catch(e){
        next(e);
    }
}

const deleteOrder = async (req, res, next)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            'response': {
                'message': 'Order deleted'
            }
        })
    } catch(e){
        next(e);
    }
}

module.exports = {
    placeOrder,
    placeOrders,
    getAllOrders,
    getOrder,
    updateOrder,
    deleteOrder
}
