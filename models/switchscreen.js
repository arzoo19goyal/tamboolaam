const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const switchscreenSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    status:{
        type: Boolean,
        required:true
    }
});
switchscreenSchema.plugin(timestamps);
exports.SwitchScreen = mongoose.model('SwitchScreen', switchscreenSchema);