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
        path: 'address'
    })

    res.json({
        allOrderOfUser
    })
}

exports.getAllOrderFetcherController = async (req, res, next) => {

    let allOrder = await Order.find().populate({
        path: 'address'
    })

    res.json({
        allOrder
    })
}



exports.orderRecentGetController = async (req, res, next) => {

    let recentOrders = await Order.find().sort({ createdAt: '-1' }).limit(5)

    res.json({
        recentOrders
    })
}





















exports.orderPostUpdateController = async (req, res, next) => {

    let { id } = req.params

    let { updateStatus, preTime } = req.body

    console.log(req.body);



    await Order.findOneAndUpdate({ _id: id }, {
        $set: { paymentStatus: updateStatus.payment, orderStatus: updateStatus.order, orderTimeline: createOrderTimeline(updateStatus.order, preTime) },
    })


    res.json({
        msg: 'Successfully,updated',
        color: 'success'
    })

}


function createOrderTimeline(type, preTime) {
    //
    let orderTimeline = [
        {
            status: 'pending',
            text: 'Thank you for placing your order to us. We will start processing your order after payment is completed',
            time: new Date().toLocaleString()
        },
        {
            status: 'processing',
            text: 'Your payment status is verified,successfully.We will send your products soon,inshallah',
            time: new Date().toLocaleString()
        },
        {
            status: 'shipped',
            text: 'Your have already shipped your products.We hope you will get your products soon,inshallah',
            time: new Date().toLocaleString()
        },
        {
            status: 'deliverd',
            text: 'We have deliverd your products successfully,alhamdulillah',
            time: new Date().toLocaleString()
        }
    ]
    if (type == 'pending') {

        orderTimeline[0].time = preTime.prePendingTime

        return orderTimeline.slice(0, 1)
    }
    else if (type == 'processing') {
        orderTimeline[0].time = preTime.prePendingTime
        return orderTimeline.slice(0, 2)
    } else if (type == 'shipped') {

        orderTimeline[0].time = preTime.prePendingTime
        orderTimeline[1].time = preTime.preProcessingTime
        return orderTimeline.slice(0, 3)
    } else if (type == 'deliverd') {
        orderTimeline[0].time = preTime.prePendingTime
        orderTimeline[1].time = preTime.preProcessingTime
        orderTimeline[2].time = preTime.preShippedTime

        return orderTimeline.slice(0, 4)
    }
}