const {Order} = require('../models/order');
const validateOrder = async (req, res, next) => {
    try {
        const update = await Order.findById(req.params.id);
        if(!update){
            return res.status(400).send({
                'error': {
                    'message': `order with order_id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e)
    }
}



module.exports = {
    validateOrder
}