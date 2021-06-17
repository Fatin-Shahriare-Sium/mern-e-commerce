const { signupPostController, loginPostController, changepasswordPostController } = require('../controller/authController')

let router=require('express').Router()

router.post('/signup',signupPostController)
router.post('/login',loginPostController)
router.post('/changepass/:token',changepasswordPostController)
module.exports=router