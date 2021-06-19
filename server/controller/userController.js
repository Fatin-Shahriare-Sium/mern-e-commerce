const User = require("../model/user")

exports.userInfoGetController=async (req,res,next)=>{
    let {id}=req.params
    console.log(req);
    let user=await User.findOne({_id:id})

    res.json({
       userInfo:user
    })
}


exports.userInfoEditController=async (req,res,next)=>{
    let {id}=req.params
    let {name,phoneNum,gender,brithDate}=req.body
    console.log(req.body);

    

    try{
        await User.findOneAndUpdate({_id:id},{
            $set:{'name':name,contactNumber:phoneNum,'gender':gender,brithDate}
        })

        res.json({
            msg:'Successfully,updated account information',
            color:'success'
        })

    }catch{

        res.json({
            msg:'Failed to update your account info',
            color:'danger'
        })

    }
}