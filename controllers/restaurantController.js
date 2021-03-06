const { Restaurant } = require('../models/restaurant');

const insertRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = await new Restaurant(req.body);
        await newRestaurant.save();
        return res.status(200).send({
            'response': {
                'restaurant': newRestaurant
            }
        })
    } catch (e) {
        next(e);
    }
}

const insertRestaurants = async (req, res, next) => {
    try {
        const body = req.body;
        let restaurants = body.restaurants
        let multipleRestaurants = await Restaurant.insertMany(restaurants);

        return res.status(200).send({
            'response': {
                'restaurant': multipleRestaurants
            }
        })
    } catch (e) {
        next(e);
    }
}

const getAllRestaurants = async (req, res, next) => {
    try {
        const page = Number(req.query.limit) * ((req.query.page) - 1) || 0;
        const limit = Number(req.query.limit) || 10;
        var query = {}

        if (req.body.address) {
            query.address = req.body.address;
        }
        if (req.body.staff) {
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
        return res.status(200).send({
            'response': {
                'message': restaurant
            }
        })
    } catch (e) {
        next(e);
    }
}

const upadteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        return res.status(200).send({
            'response': {
                'message': "Updated successfully",
                'result': restaurant
            }
        })
    } catch (e) {
        next(e);
    }
}

const deleteRestaurant = async (req, res, next) => {
    try {
        await Restaurant.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'Restaurant deleted'
            }
        })
    } catch (e) {
        next(e);
    }
}


module.exports = {
    insertRestaurant,
    insertRestaurants,
    getAllRestaurants,
    getRestaurant,
    upadteRestaurant,
    deleteRestaurant

}
