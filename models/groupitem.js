const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const groupitemSchema = mongoose.Schema({
    items:[{
    name: {
        type: String,
        required:true
    },
    category: {
        type: String,
    },
    sub_category: {
        type: String
    },
    price: {
        type: Number,
        required:true
    }
    }],
    recurring_frequency:{
        type: String
    },
    recurring_type:{
        type: String
    },
    recurring_period:{
        type: String
    },
    recurring_period_unit:{
        type: String
    },
    restaurant_id:{
        type: String
    },
    nutritition_details:{
        type:Object
    }
});
groupitemSchema.plugin(timestamps);
exports.GroupItem = mongoose.model('GroupItem', groupitemSchema);