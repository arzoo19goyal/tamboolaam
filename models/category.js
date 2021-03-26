const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const categorySchema = mongoose.Schema({
    category_value: {
        type: String,
        required:true
    },
    category_slug: {
        type: String,
    },
    category_type: {
        type: String
    },
    category_sub_type: {
        type: String
    }
});
categorySchema.plugin(timestamps);
exports.Category = mongoose.model('Category', categorySchema);