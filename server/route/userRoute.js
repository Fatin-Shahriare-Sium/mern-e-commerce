const { userInfoGetController, userInfoEditController, userWishlistController, userWishlistCheckerController, userWishlistDetailsController, userReviewsGetController, uploadProfilePicController, updatecartedProductController, userCartedProductGetController } = require('../controller/userController')

let router = require('express').Router()

router.get('/info/:id', userInfoGetController)

router.post('/info/edit/:id', userInfoEditController)

router.get('/wishlist', userWishlistController)

router.get('/wishlist/check', userWishlistCheckerController)

router.get('/wishlist/detail', userWishlistDetailsController)

router.get('/reviews/:userId', userReviewsGetController)

router.post('/uploadProfilePic', uploadProfilePicController)

router.post('/update/cartedProduct', updatecartedProductController)

router.get('/cartedProduct/:userId', userCartedProductGetController)
module.exports = router