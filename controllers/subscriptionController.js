const {Subscription} = require('../models/subscription');

const placedSubscription = async (req, res, next)=>{
    try{
        const subscription = await new Subscription(req.body);
        await subscription.save();
        return res.status(200).send({
            'response': {
                'message': "subscription",
                'subscription': subscription
            }
        })
    } catch(ex){
        next(ex);
    }
}


const getAllSubscriptions = async (req, res, next) => {
    try {
        const page = Number(req.query.limit)*((req.query.page)-1) || 0;
        const limit = Number(req.query.limit) || 10;

        const allSubscriptions = await Subscription.find().skip(page).limit(limit);
        if(allSubscriptions){
            console.log(allSubscriptions);
             return res.status(200).send({
                'response': {
                    'message': "allSubscriptions",
                    'subscription': allSubscriptions
                }
            })
        }
        else {
            return res.status(400).send({
                'response': {
                    'message': "no subscriptions"
                }
            })
        }
    } catch(e){
        next(e)
    }
}

const getSubscription = async (req, res, next)=> {
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(subscription){
            return res.status(subscription ? 200 : 400).send({
                'response': {
                    'message': subscription ? subscription : "no subscription found"
                }
            })        }
    } catch(e) {
        next(e);
    }
}

const updateSubscription = async (req, res, next)=>{
    try{
        const update = await Subscription.findByIdAndUpdate(req.body.subscription_id, { $set:req.body});
        if(update){
            return res.status(update ? 200 : 400).send({
                'response': {
                    'message': update ? "Subscription updated successfully" : "no subscription"
                }
            })
        }
    } catch(e){
        next(e);
    }
}

const deleteSubscription = async (req, res, next)=>{
    try{
        const subscription = await Subscription.findOneAndDelete({_id: req.body.id});
        if(subscription){
            return res.status(subscription ? 200: 400).send({
                'response': {
                    'message': subscription ? 'Subscription deleted' : "subscription not found"
                }
            })
        }
    } catch(e){
        next(e);
    }
}

module.exports = {
    placedSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    deleteSubscription
}