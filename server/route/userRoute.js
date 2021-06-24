const { userInfoGetController, userInfoEditController, userWishlistController, userWishlistCheckerController, userWishlistDetailsController } = require('../controller/userController')

let router = require('express').Router()

router.get('/info/:id', userInfoGetController)

router.post('/info/edit/:id', userInfoEditController)

router.get('/wishlist', userWishlistController)

router.get('/wishlist/check', userWishlistCheckerController)

router.get('/wishlist/detail', userWishlistDetailsController)

module.exports = router