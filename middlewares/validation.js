const {Order} = require('../models/order');
const validateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if(!order){
            return res.status(400).send({
                'error': {
                    'message': `order with order_id: ${req.params.id} not found`
                }
            })
        }
        next();
    } catch (e) {
        next(e);
    }
}

module.exports = {
    validateOrder
}