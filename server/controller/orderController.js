let uuid = require('uuid')
const Order = require('../model/order')
const User = require('../model/user')
let stripe = require('stripe')('sk_test_51J4rHMFpIjqeQSowkMeG3KxDKxCEwxE3blfu4dkDdZz7IJzs1Q8eCeYyCOisQApnafc2BS3ie9B2fjaTJl3MDPgv00hjUyYC2B')

exports.orderCreateController = async (req, res, next) => {
    let { totalAmount, product, type, addressId, user, bkashTnxId, nagadTnxId, token } = req.body

    if (type == 'card') {
        let newOrder = new Order({
            user: user._id,
            address: addressId,
            stripeEmail: token.email,
            product,
            paymentStatus: 'verifing',
            orderStatus: 'pending',
            totalAmount,
            paymentMethod: type,
            bkashTnxId: '',
            nagadTnxId: '',
            orderTimeline: [{
                status: 'pending',
                text: 'Thank you for placing your order to us. We will start processing your order after payment is completed',
                time: new Date().toLocaleString()
            }]

        })
        let orderx = await newOrder.save()
        await User.findOneAndUpdate({ _id: user._id }, {
            $push: { orderItems: orderx._id }
        })
        return stripe.customers.create({
            email: token.email,
            source: token.id
        }).then(customer => {
            stripe.charges.create({
                amount: totalAmount,
                currency: 'usd',
                customer: customer.id,
                description: `payment by ${token.email} and totalAmount is ${totalAmount}`
            })
        }).then(result => {
            res.status(200).json({
                msg: 'success'
            })

        })

    } else {
        let newOrder = new Order({
            user: user._id,
            address: addressId,
            stripeEmail: '',
            product,
            paymentStatus: 'verifing',
            orderStatus: "pending",
            totalAmount,
            paymentMethod: type,
            bkashTnxId,
            nagadTnxId,
            orderTimeline: [{
                status: 'pending',
                text: 'Thank you for placing your order to us. We will start processing your order after payment is completed',
                time: new Date().toLocaleString()
            }]

        })

        let orderx = await newOrder.save()
        await User.findOneAndUpdate({ _id: user._id }, {
            $push: { orderItems: orderx._id }
        })
        res.json({
            msg: 'success'
        })
    }




}


exports.getAllOrderController = async (req, res, next) => {
    let { userId } = req.params

    let allOrderOfUser = await Order.find({ user: userId }).populate({
        path:'address'
    })

    res.json({
        allOrderOfUser
    })
}