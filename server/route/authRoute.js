const { signupPostController } = require('../controller/authController')

let router=require('express').Router()

router.post('/signup',signupPostController)

module.exports=router