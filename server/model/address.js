let {Schema,model}=require('mongoose')


let addressSchema=new Schema({
    name:String,
    email:String,
    contactNum:String,
    country:String,
    city:String,
    streetAddress:String,
    postalCode:String,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

let Address=model('address',addressSchema)

module.exports=Address