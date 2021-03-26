const {Restaurant} = require('../models/restaurant');

const getAllRestaurants = async (req, res, next) => {
    try {
        const page = Number(req.query.limit)*((req.query.page)-1) || 0;
        const limit = Number(req.query.limit) || 10;

        const allRestaurants = await Restaurant.find().skip(page).limit(limit);
        if(allRestaurants){
            console.log(allRestaurants);
             return res.status(200).send({
                'response': {
                    'message': "All restaurants",
                    'result': allRestaurants
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no restaurants found"
                }
            })
        }
    } catch(e){
        next(e)
    }
}

module.exports = {
    getAllRestaurants,
}