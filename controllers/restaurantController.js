const { Restaurant } = require('../models/restaurant');

const insertRestaurant = async (req, res, next)=>{
    try{
        const body = req.body;
        let restaurants = body.restaurants
        let multipleRestaurants = await Restaurant.insertMany(restaurants);
        // const newRestaurant = await new Restaurant(req.body);
        // await newRestaurant.save();
        return res.status(200).send({
            'response': {
                'restaurant': multipleRestaurants
            }
        })
    } catch(e) {
        next(e);
    }
}

const getAllRestaurants = async (req, res, next) => {
    try {
        const page = Number(req.query.limit) * ((req.query.page) - 1) || 0;
        const limit = Number(req.query.limit) || 10;
        var query = {}

        if(req.body.address){
            query.address = req.body.address;
        }
        if(req.body.staff){
            query.staff = req.body.staff;
        }

        const allRestaurants = await Restaurant.find(query).skip(page).limit(limit);
        var count = await Restaurant.count(query);

        if (allRestaurants) {
            console.log(allRestaurants);
            return res.status(200).send({
                'response': {
                    'message': "All restaurants",
                    'result': allRestaurants,
                    'count': count
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
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id,{$set: req.body});
        console.log(restaurant);
        if(restaurant){
            return res.status(restaurant ? 200 : 400).send({
                'response': {
                    'message': restaurant ? "Updated successfully": "restaurant not found"
                }
            })
        }
        
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
