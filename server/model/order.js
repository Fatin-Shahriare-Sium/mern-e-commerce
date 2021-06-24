let { Schema, model } = require('mongoose')

let orderModel = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'address'
    },
    stripeEmail: String,
    product: Array,
    paymentStatus: String,
    orderStatus: String,
    totalAmount: Number,
    paymentMethod: String,
    bkashTnxId: String,
    nagadTnxId: String
})

let Order = model('order', orderModel)

module.exports = Order