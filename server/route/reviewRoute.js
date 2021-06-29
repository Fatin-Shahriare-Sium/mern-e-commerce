const { createReviewController, reviewFinderThroughProductid } = require('../controller/reviewController')

let router = require('express').Router()

router.post('/create', createReviewController)
router.get('/find', reviewFinderThroughProductid)

module.exports = router