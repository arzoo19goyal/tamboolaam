const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const cuisineSchema = mongoose.Schema({
    cuisine_value: {
        type: String,
        required:true
    },
    cuisine_slug: {
        type: String,
    },
    cuisine_type: {
        type: String
    },
    description: {
        type: String
    },
    cuisine_sub_type: {
        type: String
    }
});
cuisineSchema.plugin(timestamps);
exports.Cuisine = mongoose.model('Cuisine', cuisineSchema);