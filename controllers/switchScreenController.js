const {SwitchScreen} = require('../models/switchscreen');

const insertSwitchScreen = async (req, res, next)=>{
    try{
        console.log(req.body)
        const newSwitchScreen = await new SwitchScreen(req.body);
        await newSwitchScreen.save();
        return res.status(200).send({
            'response': {
                'SwitchScreen': newSwitchScreen
            }
        })
    } catch(e){
        next(e);
    }
}

const insertSwitchScreens = async (req, res, next)=>{
    try{
        const body = req.body;
        let switchscreens = body.switchscreens
        let multipleSwitchScreens = await SwitchScreen.insertMany(switchscreens);

        return res.status(200).send({
            'response': {
                'SwitchScreen': multipleSwitchScreens
            }
        })
    } catch(e){
        next(e)
    }
}

const getAllSwitchScreens = async (req, res, next) => {
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

        const allSwitchScreens = await SwitchScreen.find(query).skip(page).limit(limit);
        var count = await SwitchScreen.count(query);
        if(allSwitchScreens){
            // console.log(allSwitchScreens);
             return res.status(200).send({
                'response': {
                    'message': "All switchscreens",
                    'result': allSwitchScreens,
                    'count': count
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no switchscreens found"
                }
            })
        }
    } catch(e){
        next(e)
    }
}


const getSwitchScreen = async (req, res, next) => {
    try {
        const switchscreen = await SwitchScreen.findById(req.params.id);
        return res.status(200).send({
            'response': {
                'message': switchscreen
            }
        })
    } catch (e) {
        next(e);
    }
}


const updateSwitchScreen = async (req, res, next) => {
    try{
        const switchscreen = await SwitchScreen.findByIdAndUpdate(req.params.id,{$set: req.body}, {new: true});
        console.log(switchscreen);
        return res.status(200).send({
            'response': {
                'message': "SwitchScreen updated successfully",
                'result': switchscreen
            }
        })
        
    } catch(e){
        next(e);
    }
}

const deleteSwitchScreen = async (req, res, next)=>{
    try{
        await SwitchScreen.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            'response': {
                'message': 'SwitchScreen deleted'
            }
        })
    } catch(e){
        next(e);
    }
}


module.exports = {
    insertSwitchScreen,
    insertSwitchScreens,
    getAllSwitchScreens,
    getSwitchScreen,
    updateSwitchScreen,
    deleteSwitchScreen
}