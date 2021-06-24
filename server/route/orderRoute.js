const { orderCreateController } = require('../controller/orderController')

let router = require('express').Router()

router.post('/create', orderCreateController)

module.exports = router