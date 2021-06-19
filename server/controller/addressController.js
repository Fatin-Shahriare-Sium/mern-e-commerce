const Address = require("../model/address");

exports.createAddressPostController = async (req, res, next) => {
    console.log(req.body);
    let { userId, name, email, contactNum, country, city, streetAddress, postalCode } = req.body

    let newAddress = new Address({
        name,
        email,
        contactNum,
        country,
        city,
        streetAddress,
        postalCode,
        user: userId

    })

    try {
        await newAddress.save()

        res.json({
            msg: 'Successfully,created address',
            color: 'success'
        })

    } catch {
        res.json({
            msg: 'Failed to create address',
            color: 'danger'
        })
    }

}

exports.getAllAddressThroughUser = async (req, res, next) => {
    let { userId } = req.params

    let allAddress = await Address.find({ user: userId })

    res.json({
        allAddress
    })
}

exports.getSingleAddressController = async (req, res, next) => {
    let { id } = req.params
    console.log(id);

    let singleAddress = await Address.findOne({ _id: id })

    res.json({
        singleAddress
    })
}


exports.deleteSingleAddressController = async (req, res, next) => {
    let { id } = req.params

    try {

        await Address.deleteOne({ _id: id })

        res.json({
            msg: 'Successfully,delete your address',
            color: 'success'
        })

    } catch {
        res.json({
            msg: "Unable to delete address",
            color: 'warning'
        })
    }
}

exports.editSingleAddressController = async (req, res, next) => {
    let { id } = req.params
    let { name, email, contactNum, country, city, streetAddress, postalCode } = req.body
    console.log(req.body);

    try {
        await Address.findOneAndUpdate({ _id: id }, {
            $set: {
                name,
                email,
                contactNum,
                country,
                city,
                streetAddress,
                postalCode,
            }
        })

        res.json({
            msg: 'Successfully,updated address',
            color: 'success'
        })

    } catch {
        res.json({
            msg: "Unable to update your address",
            color: 'danger'
        })
    }
}