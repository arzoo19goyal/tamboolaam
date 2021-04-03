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
    is_veg:{
        type:Boolean,
        default:true
    },
    restaurant_name:{
        type: String
    },
    cuisine:{
        type: String
    },
    item_image:{
        type: String
    },
    price: {
        type: Number,
        required:true
    },
    is_featured:{
      type:Boolean,
      default:false
    },
    nutrition_details:{
        type:Object
    }
});
itemSchema.plugin(timestamps);
exports.Item = mongoose.model('Item', itemSchema);