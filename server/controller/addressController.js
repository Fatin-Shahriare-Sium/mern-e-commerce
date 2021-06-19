const Address = require("../model/address");

exports.createAddressPostController=async (req,res,next)=>{
    console.log(req.body);
    let {userId,name,email,contactNum,country,city,streetAddress,postalCode}=req.body

    let newAddress=new Address({
        name,
        email,
        contactNum,
        country,
        city,
        streetAddress,
        postalCode,
        user:userId

    })

    try{
        await newAddress.save()

        res.json({
            msg:'Successfully,created address',
            color:'success'
        })

    }catch{
        res.json({
            msg:'Failed to create address',
            color:'danger'
        })
    }

}

exports.getAllAddressThroughUser=async (req,res,next)=>{
    let {userId}=req.params

    let allAddress=await Address.find({user:userId})
    console.log(allAddress);
}