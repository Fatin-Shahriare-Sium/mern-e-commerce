let uuid = require('uuid')
const Order = require('../model/order')
let stripe = require('stripe')('sk_test_51J4rHMFpIjqeQSowkMeG3KxDKxCEwxE3blfu4dkDdZz7IJzs1Q8eCeYyCOisQApnafc2BS3ie9B2fjaTJl3MDPgv00hjUyYC2B')
exports.orderCreateController = async (req, res, next) => {
    let { totalAmount, product, type, addressId, user, bkashTnxId, nagadTnxId, token } = req.body
    console.log(req.body);
    if (type == 'card') {
        let newOrder = new Order({
            user: user._id,
            address: addressId,
            stripeEmail: token.email,
            product,
            paymentStatus: 'unpaid',
            orderStatus: "pending",
            totalAmount,
            paymentMethod: type,
            bkashTnxId: '',
            nagadTnxId: ''

        })
        await newOrder.save()
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
            res.status.json({
                msg: 'success'
            })

        })

    } else {
        let newOrder = new Order({
            user: user._id,
            address: addressId,
            stripeEmail: '',
            product,
            paymentStatus: 'unpaid',
            orderStatus: "pending",
            totalAmount,
            paymentMethod: type,
            bkashTnxId,
            nagadTnxId

        })

        await newOrder.save()
        res.json({
            msg: 'success'
        })
    }




}