const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
 
const subscriptionSchema = mongoose.Schema({
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
    total: {
        type: Number,
    },
    sub_total: {
        type: Number,
    },
    name: {
        type: String,
    },
    category: {
        type: String,
    },
    sub_category: {
        type: String
    },
    nutritition_details:{
        type:Object
    },
    start_date: {
        type: Date
    },
    end_date: {
        type: Date
    },
    user_id: {
        type: String
    },
    driver_id: {
        type: String
    },
    delivery_address: {
        line1: {
          type: String
        },
        line2: {
          type: String
        },
        line3: {
          type: String
        },
        lat: {
          type: String
        },
        long: {
          type: String
        }
    },
});
subscriptionSchema.plugin(timestamps);
exports.Subscription = mongoose.model('Subscription', subscriptionSchema);