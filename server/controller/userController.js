const User = require("../model/user")

exports.userInfoGetController = async (req, res, next) => {
    let { id } = req.params
    console.log(req);
    let user = await User.findOne({ _id: id })

    res.json({
        userInfo: user
    })
}


exports.userInfoEditController = async (req, res, next) => {
    let { id } = req.params
    let { name, phoneNum, gender, brithDate } = req.body
    console.log(req.body);



    try {
        await User.findOneAndUpdate({ _id: id }, {
            $set: { 'name': name, contactNumber: phoneNum, 'gender': gender, brithDate }
        })

        res.json({
            msg: 'Successfully,updated account information',
            color: 'success'
        })

    } catch {

        res.json({
            msg: 'Failed to update your account info',
            color: 'danger'
        })

    }
}


exports.userWishlistController = async (req, res, next) => {
    let { userId, productId } = req.query
    console.log(req.query);
    let user = await User.findOne({ _id: userId })

    if (user.wishlistItems.includes(productId)) {
        await User.findOneAndUpdate({ _id: userId }, {
            $pull: { 'wishlistItems': productId }
        })

        return res.status(200).json({
            fill: false
        })
    } else {
        await User.findOneAndUpdate({ _id: userId }, {
            $push: { 'wishlistItems': productId }
        })

        return res.status(200).json({
            fill: true
        })

    }

}

exports.userWishlistCheckerController = async (req, res, next) => {

    let { userId, productId } = req.query

    let user = await User.findOne({ _id: userId })

    if (user.wishlistItems.includes(productId)) {

        return res.status(200).json({
            fill: true
        })
    } else {

        return res.status(200).json({
            fill: false
        })

    }

}


exports.userWishlistDetailsController = async (req, res, next) => {
    let { userId } = req.query

    let userx = await User.findOne({ _id: userId }).populate({
        path: 'wishlistItems'
    })

    return res.json({
        wishlistItems: userx.wishlistItems
    })

}