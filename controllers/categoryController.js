const {Category} = require('../models/category');

const insertCategory = async (req, res, next)=>{
    try{
        const newCategory = await new Category(req.body);
        await newCategory.save();
        return res.status(200).send({
            'response': {
                'Category': newCategory
            }
        })
    } catch(e){
        next(e);
    }
}

const insertCategorys = async (req, res, next)=>{
    try{
        const body = req.body;
        let categorys = body.categorys
        let multipleCategorys = await Category.insertMany(categorys);

        return res.status(200).send({
            'response': {
                'Category': multipleCategorys
            }
        })
    } catch(e){
        next(e)
    }
}

const getAllCategorys = async (req, res, next) => {
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

        const allCategorys = await Category.find(query).skip(page).limit(limit);
        var count = await Category.count(query);
        if(allCategorys){
            // console.log(allCategorys);
             return res.status(200).send({
                'response': {
                    'message': "All categorys",
                    'result': allCategorys,
                    'count': count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no categorys found"
                }
            })
        }
    } catch(e){
        next(e)
    }
}


const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            return res.status(category ? 200 : 400).send({
                'response': {
                    'message': category ? category : "no category found with this id"
                }
            })
        }
    } catch (e) {
        next(e);
    }
}


const updateCategory = async (req, res, next) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,{$set: req.body});
        console.log(category);
        return res.status(200).send({
            'response': {
                'message': "Category updated successfully"
            }
        })
        
    } catch(e){
        next(e);
    }
}

const deleteCategory = async (req, res, next)=>{
    try{
        await Category.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'Category deleted'
            }
        })
    } catch(e){
        next(e);
    }
}


module.exports = {
    insertCategory,
    insertCategorys,
    getAllCategorys,
    getCategory,
    updateCategory,
    deleteCategory
}