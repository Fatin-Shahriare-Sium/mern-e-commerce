const { orderCreateController, getAllOrderController } = require('../controller/orderController')

let router = require('express').Router()

router.post('/create', orderCreateController)
router.get('/all/:userId', getAllOrderController)

module.exports = router