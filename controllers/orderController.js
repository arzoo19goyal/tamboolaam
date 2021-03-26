const {Order} = require('../models/order');

const placedOrder = async (req, res, next)=>{
    try{
        const order = await new Order(req.body);
        await order.save();
        return res.status(200).send({
            'response': {
                'message': "order",
                'order': order
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

        const allOrders = await Order.find().skip(page).limit(limit);
        if(allOrders){
            console.log(allOrders);
             return res.status(200).send({
                'response': {
                    'message': "allOrders",
                    'order': allOrders
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

const updateOrderStatus = async (req, res, next)=>{
    try{
        const update = await Order.findByIdAndUpdate(req.params.order_id, {status: req.body.order_status});
        if(update){
            return res.status(user ? 200 : 400).send({
                'response': {
                    'message': user ? "Order updated successfully" : "no order"
                }
            })
        }
    } catch(e){
        next(e);
    }
}

module.exports = {
    placedOrder,
    getAllOrders,
    updateOrderStatus
}