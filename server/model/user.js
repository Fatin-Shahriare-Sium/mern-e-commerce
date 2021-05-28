let {Schema,model}=require('mongoose')

let userModel=new Schema({
    name:String,
    email:String,
    profilePic:String,
    password:String,
    admin:Boolean,
    address:String,
    cartedItems:[{
        type:Schema.Types.ObjectId,
        ref:'product'
    }],
    orderItems:[{
        type:Schema.Types.ObjectId,
        ref:'order'
    }],
    wishlistItems:[{
        type:Schema.Types.ObjectId,
        ref:'product'
    }],
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:'review'
    }]
})

let User=model('user',userModel)

module.exports=User