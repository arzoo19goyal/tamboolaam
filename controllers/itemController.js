const {Item} = require('../models/item');

const insertItem = async (req, res, next)=>{
    try{
        console.log(req.body)
        const newItem = await new Item(req.body);
        await newItem.save();
        return res.status(200).send({
            'response': {
                'Item': newItem
            }
        })
    } catch(e){
        next(e);
    }
}

const insertItems = async (req, res, next)=>{
    try{
        const body = req.body;
        let items = body.items
        let multipleItems = await Item.insertMany(items);

        return res.status(200).send({
            'response': {
                'Item': multipleItems
            }
        })
    } catch(e){
        next(e)
    }
}

const getAllItems = async (req, res, next) => {
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

        const allItems = await Item.find(query).skip(page).limit(limit);
        var count = await Item.count(query);
        if(allItems){
            // console.log(allItems);
             return res.status(200).send({
                'response': {
                    'message': "All items",
                    'result': allItems,
                    'count': count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no items found"
                }
            })
        }
    } catch(e){
        next(e)
    }
}


const getItem = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            return res.status(item ? 200 : 400).send({
                'response': {
                    'message': item ? item : "no item found with this id"
                }
            })
        }
    } catch (e) {
        next(e);
    }
}


const updateItem = async (req, res, next) => {
    try{
        const item = await Item.findByIdAndUpdate(req.params.id,{$set: req.body});
        console.log(item);
        return res.status(200).send({
            'response': {
                'message': "Item updated successfully"
            }
        })
        
    } catch(e){
        next(e);
    }
}

const deleteItem = async (req, res, next)=>{
    try{
        await Item.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'Item deleted'
            }
        })
    } catch(e){
        next(e);
    }
}


module.exports = {
    insertItem,
    insertItems,
    getAllItems,
    getItem,
    updateItem,
    deleteItem
}