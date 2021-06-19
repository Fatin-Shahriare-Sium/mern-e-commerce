const { createAddressPostController, getAllAddressThroughUser, deleteSingleAddressController, editSingleAddressController, getSingleAddressController } = require('../controller/addressController')

let router = require('express').Router()


router.post('/create', createAddressPostController)
router.get('/all/:userId', getAllAddressThroughUser)
router.get('/delete/:id', deleteSingleAddressController)
router.get('/:id', getSingleAddressController)
router.post('/edit/:id', editSingleAddressController)

module.exports = router