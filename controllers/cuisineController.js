const {Cuisine} = require('../models/cuisine');

const insertCuisine = async (req, res, next)=>{
    try{
        const newCuisine = await new Cuisine(req.body);
        await newCuisine.save();
        return res.status(200).send({
            'response': {
                'Cuisine': newCuisine
            }
        })
    } catch(e){
        next(e);
    }
}

const insertCuisines = async (req, res, next)=>{
    try{
        const body = req.body;
        let cuisines = body.cuisines
        let multipleCuisines = await Cuisine.insertMany(cuisines);

        return res.status(200).send({
            'response': {
                'Cuisine': multipleCuisines
            }
        })
    } catch(e){
        next(e)
    }
}

const getAllCuisines = async (req, res, next) => {
    try {
        const page = Number(req.query.limit)*((req.query.page)-1) || 0;
        const limit = Number(req.query.limit) || 10;
        var query = {}

        if(req.query.sub_category){
            query.sub_category = req.query.sub_category;
        }
        if(req.query.category){
            query.category = req.query.category;
        }
        if(req.query.restaurant_id){
            query.restaurant_id = req.query.restaurant_id;
        }

        const allCuisines = await Cuisine.find(query).skip(page).limit(limit);
        var count = await Cuisine.count(query);
        if(allCuisines){
            // console.log(allCuisines);
             return res.status(200).send({
                'response': {
                    'message': "All cuisines",
                    'result': allCuisines,
                    'count': count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no cuisines found"
                }
            })
        }
    } catch(e){
        next(e)
    }
}


const getCuisine = async (req, res, next) => {
    try {
        const cuisine = await Cuisine.findById(req.params.id);
        if (cuisine) {
            return res.status(cuisine ? 200 : 400).send({
                'response': {
                    'message': cuisine ? cuisine : "no cuisine found with this id"
                }
            })
        }
    } catch (e) {
        next(e);
    }
}


const updateCuisine = async (req, res, next) => {
    try{
        const cuisine = await Cuisine.findByIdAndUpdate(req.params.id,{$set: req.body});
        console.log(cuisine);
        return res.status(200).send({
            'response': {
                'message': "Cuisine updated successfully"
            }
        })
        
    } catch(e){
        next(e);
    }
}

const deleteCuisine = async (req, res, next)=>{
    try{
        await Cuisine.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'Cuisine deleted'
            }
        })
    } catch(e){
        next(e);
    }
}


module.exports = {
    insertCuisine,
    insertCuisines,
    getAllCuisines,
    getCuisine,
    updateCuisine,
    deleteCuisine
}