const { createProductController } = require('../controller/productController')

let router=require('express').Router()

router.post('/create',createProductController)

module.exports=router