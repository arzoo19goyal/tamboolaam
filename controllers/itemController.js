const {Item} = require('../models/item');

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

module.exports = {
    getAllItems
}