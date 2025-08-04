const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    id : Number,
    user_id : Number,
    product : String,
    price : Number,
    quantity : Number
}, { collection : 'orders'});

module.exports = mongoose.model('Order', OrderSchema);

