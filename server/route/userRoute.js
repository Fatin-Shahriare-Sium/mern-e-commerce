const { userInfoGetController, userInfoEditController } = require('../controller/userController')

let router=require('express').Router()

router.get('/info/:id',userInfoGetController)

router.post('/info/edit/:id',userInfoEditController)


module.exports=router