
let { Schema, model } = require('mongoose')

let productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    priceOff: Number,
    brand: String,
    category: String,
    remain: Number,
    img: Array,//{src:'',alt:''}
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }],
})

productSchema.index({
    title: 'text',
    brand: 'text',
    category: 'text'
}, {
    weights: {
        title: 5,
        brand: 3,
        category: 2
    }
})

let Product = model('product', productSchema)

module.exports = Product