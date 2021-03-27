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
        var query = {}
        if(req.query.order_type){
            query.order_type=req.query.order_type
        }
        const allOrders = await Order.find(query).skip(page).limit(limit);
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

const getOrder = async (req, res, next)=> {
    try{
        const order = await Order.findById(req.params.id);
        if(order){
            return res.status(order ? 200 : 400).send({
                'response': {
                    'message': order ? order : "no order found"
                }
            })        }
    } catch(e) {
        next(e);
    }
}

const updateOrder = async (req, res, next)=>{
    try{
        const update = await Order.findByIdAndUpdate(req.body.order_id, { $set:req.body});
        if(update){
            return res.status(update ? 200 : 400).send({
                'response': {
                    'message': update ? "Order updated successfully" : "no order"
                }
            })
        }
    } catch(e){
        next(e);
    }
}

const deleteOrder = async (req, res, next)=>{
    try{
        const order = await Order.findOneAndDelete({_id: req.body.id});
        if(order){
            return res.status(order ? 200: 400).send({
                'response': {
                    'message': order ? 'Order deleted' : "order not found"
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
    getOrder,
    updateOrder,
    deleteOrder
}