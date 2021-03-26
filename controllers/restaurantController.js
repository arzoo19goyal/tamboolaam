const { Restaurant } = require('../models/restaurant');

const insertRestaurant = async (req, res, next)=>{
    const newRestaurant = await new Restaurant(req.body);
    await newRestaurant.save();
    return res.status(200).send({
        'response': {
            'restaurant': newRestaurant
        }
    })
}

const getAllRestaurants = async (req, res, next) => {
    try {
        const page = Number(req.query.limit) * ((req.query.page) - 1) || 0;
        const limit = Number(req.query.limit) || 10;

        const allRestaurants = await Restaurant.find().skip(page).limit(limit);
        if (allRestaurants) {
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
    } catch (e) {
        next(e)
    }
}

const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            return res.status(restaurant ? 200 : 400).send({
                'response': {
                    'message': restaurant ? restaurant : "no restaurant found with this id"
                }
            })
        }
    } catch (e) {
        next(e);
    }
}

const upadteRestaurant = async (req, res, next) => {
    try{
        const restaurant = await Restaurant.findOneAndUpdate({_id: req.body.id},{$set: req.body});
        console.log(restaurant);
        return res.status(200).send({
            'response': {
                'message': "Updated successfully"
            }
        })
        
    } catch(e){
        next(e);
    }
}

const deleteRestaurant = async (req, res, next)=>{
    try{
        await Restaurant.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'Restaurant deleted'
            }
        })
    } catch(e){
        next(e);
    }
}


module.exports = {
    insertRestaurant,
    getAllRestaurants,
    getRestaurant,
    upadteRestaurant,
    deleteRestaurant

}
