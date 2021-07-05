const Review = require("../model/review");
const User = require("../model/user");

exports.createReviewController = async (req, res, next) => {
    let { rating, comment, userId, productId } = req.body
    console.log(req.body);
    let newReview = new Review({
        user: userId,
        productId,
        ratings: rating,
        reviewText: comment
    })

    let review = await newReview.save()

    let user = await User.findOneAndUpdate({ _id: userId }, {
        $push: { reviews: review._id }
    })

    res.json({
        msg: 'Thanks,for your review',
        color: 'success'
    })


}


exports.reviewFinderThroughProductid = async (req, res, next) => {
    let { productId } = req.query

    let allReviews = await Review.find({ productId }).sort({ 'createdAt': '-1' }).populate({
        path: 'user',
        select: { 'profilePic': 1, 'name': 1 }//you have to do this to get only user profilepic and name.it is object so,we use 1 .but,it wil change with what we need
    })

    res.json({
        allReviews
    })
}