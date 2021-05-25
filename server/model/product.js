let {Schema,model}=require('mongoose')

let productSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    priceOff:Number,
    brands:String,
    qty:Number,
    InStock:Boolean,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'review'
    }],
})

let Product=model('product',productSchema)

module.exports=Product