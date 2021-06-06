const User = require("../model/user")
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
exports.signupPostController=async (req,res,next)=>{
    let {name,password,email}=req.body
    let hashed=await bcrypt.hash(password,10)
    console.log(req.body);
    let newUser=new User({
        name,
        email,
        profilePic:'',
        password:hashed,
        admin:false,
        address:'',
        cartedItems:[],
        orderItems:[],
        wishlistItems:[],
        reviews:[]
    })

  
    let user=await newUser.save()
    let id=user._id
    let profilePic=user.profilePic
    let token=await jwt.sign({id,profilePic},'SECRET')

    try{
        
        
        res.json({
            msg:'Successfully,created an account',
            color:'success',
            user,
            token
        })

    }catch{
        res.json({
            msg:'Failed to create an account',
            color:'danger'
        })
    }
}

exports.loginPostController=async (req,res,next)=>{
    let {email,password}=req.body
    let user=await User.findOne({email:email})
    if(!user){
       return res.json({
            msg:'Failed to login',
            color:'danger'
        })
    }
    let id=user._id
    let profilePic=user.profilePic
    
    let matched=await bcrypt.compare(password,user.password)

    if(matched){
        let token=await jwt.sign({id,profilePic},'SECRET')
        res.json({
            msg:'Successfully,login to your account',
            color:'success',
            user,
            token
        })
    }else{
        res.json({
            msg:'Failed to login',
            color:'danger'
        })
    }   
}