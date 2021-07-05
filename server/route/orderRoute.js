const { orderCreateController, getAllOrderController, getAllOrderFetcherController, orderPostUpdateController, orderRecentGetController } = require('../controller/orderController')

let router = require('express').Router()

router.post('/create', orderCreateController)
router.get('/all/:userId', getAllOrderController)
router.get('/fetchAll', getAllOrderFetcherController)
router.post('/update/:id', orderPostUpdateController)
router.get('/recent', orderRecentGetController)
module.exports = router