const Product = require("../model/product")

exports.createProductController= async (req,res,next)=>{
    let {title,description,price,priceOff,brand, qty,img}=req.body

    console.log(req.body);
    // let newProduct=new Product({
    //     title,
    //     description,
    //     price,
    //     priceOff,
    //     brand, 
    //     qty,
    //     img,
    //     reviews:[]
    // })
    // await newProduct.save()
    try{
        
     

        res.json({
            msg:'Successfully,created a product',
            color:'success',
        })

    }catch{
        res.json({
            msg:'Failed to create product',
            color:'danger',
        })

    }
}