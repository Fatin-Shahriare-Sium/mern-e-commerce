let {Schema,model}=require('mongoose')

let productSchema=new Schema({
    title:String,
    description:String,
    price:Number,
    priceOff:Number,
    brand:String,
    qty:Number,
    img:Array,//{src:'',alt:''}
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'review'
    }],
})

let Product=model('product',productSchema)

module.exports=Product