const { createProductController, getAllProductController, getSingleProduct, editSingleProductController, productSearchControllerThroughText } = require('../controller/productController')

let router = require('express').Router()

router.post('/create', createProductController)
router.get('/all', getAllProductController)
router.post('/edit/:id', editSingleProductController)
router.get('/:id', getSingleProduct)
router.get('/search/:text', productSearchControllerThroughText)
module.exports = router