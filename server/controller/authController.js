const User = require("../model/user")
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')


//signup

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

//login

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


exports.changepasswordPostController=async (req,res,next)=>{
    let {token}=req.params
    let {oldPass,newPass}=req.body
    console.log(req.body);
    let userThroughToken=await jwt.verify(token,'SECRET')

    let user=await User.findOne({_id:userThroughToken.id})

    let matchedPassword=await bcrypt.compare(oldPass,user.password)

    if(matchedPassword){
        let hasedPass=await bcrypt.hash(newPass,11)
        await User.findOneAndUpdate({_id:user._id},{
            $set:{'password':hasedPass}
        })

        res.json({
            msg:'Successfully,changed password',
            color:'success'
        })
    }else{

        res.json({
            msg:'Your have given wrong password',
            color:'danger'
        })
    }

}