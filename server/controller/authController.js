const User = require("../model/user")


exports.signupPostController=async (req,res,next)=>{
    let {name,password,email}=req.body

    let newUser=new User({
        name,
        email,
        profilePic:'',
        password,
        admin:true,
        address:'',
        cartedItems:[],
        orderItems:[],
        wishlistItems:[],
        reviews:[]
    })

  

    try{
        let user=await newUser.save()

        res.json({
            msg:'Successfully,created an account',
            color:'success',
            user
        })

    }catch{
        res.json({
            msg:'Failed to create an account',
            color:'danger'
        })
    }
}