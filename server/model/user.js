let { Schema, model } = require('mongoose')

let userModel = new Schema({
    name: String,
    email: String,
    profilePic: String,
    password: String,
    admin: Boolean,
    gender: String,
    brithDate: String,
    contactNumber: String,
    address: [{
        type: Schema.Types.ObjectId,
        ref: 'address'
    }],
    cartedItems: Array,
    orderItems: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    wishlistItems: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }],
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }]
})

let User = model('user', userModel)

module.exports = User