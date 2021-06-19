const { createAddressPostController, getAllAddressThroughUser } = require('../controller/addressController')

let router=require('express').Router()


router.post('/create',createAddressPostController)
router.get('/all/:userId',getAllAddressThroughUser)

module.exports=router