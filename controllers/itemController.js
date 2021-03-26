const {Item} = require('../models/item');

const insertItem = async (req, res, next)=>{
    const newItem = await new Item(req.body);
    await newItem.save();
    return res.status(200).send({
        'response': {
            'Item': newItem
        }
    })
}

const getAllItems = async (req, res, next) => {
    try {
        const page = Number(req.query.limit)*((req.query.page)-1) || 0;
        const limit = Number(req.query.limit) || 10;

        const allItems = await Item.find().skip(page).limit(limit);
        if(allItems){
            console.log(allItems);
             return res.status(200).send({
                'response': {
                    'message': "All items",
                    'result': allItems
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
        const item = await Item.findOneAndUpdate({_id: req.body.id},{$set: req.body});
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
    getAllItems,
    getItem,
    updateItem,
    deleteItem
}