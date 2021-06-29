let { Schema, model } = require('mongoose')

let reviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product'
    },
    ratings: Number,
    reviewText: String
}, { timestamps: true })

let Review = model('review', reviewSchema)

module.exports = Review