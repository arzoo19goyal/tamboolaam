const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const itemSchema = mongoose.Schema({
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
    restaurant_id:{
        type: String
    },
    price: {
        type: Number,
        required:true
    },
    nutrition_details:{
        type:Object
    }
});
itemSchema.plugin(timestamps);
exports.Item = mongoose.model('Item', itemSchema);