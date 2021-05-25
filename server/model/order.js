let {Schema,model}=require('mongoose')

let orderModel=new Schema({
    productId:[{
        type:Schema.Types.ObjectId,
        ref:'product'
    }],
    user:[{
        type:Schema.Types.ObjectId,
        ref:'user'
    }],
    address:String,
    status:String,
    paymentMethod:String,
    totalAmount:Number,
})

let Order=model('order',orderModel)

module.exports=Order