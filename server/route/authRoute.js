const { signupPostController, loginPostController } = require('../controller/authController')

let router=require('express').Router()

router.post('/signup',signupPostController)
router.post('/login',loginPostController)

module.exports=router