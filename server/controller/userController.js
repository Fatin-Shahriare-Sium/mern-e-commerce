const User = require("../model/user");

exports.userInfoGetController = async (req, res, next) => {
  let { id } = req.params;
  //console.log(req);
  console.log(id);
  let user = await User.findOne({ _id: id });

  res.json({
    userInfo: user,
  });
};

exports.userInfoEditController = async (req, res, next) => {
  let { id } = req.params;
  let { name, phoneNum, gender, brithDate } = req.body;
  console.log(req.body);

  try {
    await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          name: name,
          contactNumber: phoneNum,
          gender: gender,
          brithDate,
        },
      }
    );

    res.json({
      msg: "Successfully,updated account information",
      color: "success",
    });
  } catch {
    res.json({
      msg: "Failed to update your account info",
      color: "danger",
    });
  }
};

exports.userWishlistController = async (req, res, next) => {
  let { userId, productId } = req.query;
  console.log(req.query);
  let user = await User.findOne({ _id: userId });

  if (user.wishlistItems.includes(productId)) {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $pull: { wishlistItems: productId },
      }
    );

    return res.status(200).json({
      fill: false,
    });
  } else {
    await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: { wishlistItems: productId },
      }
    );

    return res.status(200).json({
      fill: true,
    });
  }
};

exports.userWishlistCheckerController = async (req, res, next) => {
  let { userId, productId } = req.query;

  let user = await User.findOne({ _id: userId });

  if (user.wishlistItems.includes(productId)) {
    return res.status(200).json({
      fill: true,
    });
  } else {
    return res.status(200).json({
      fill: false,
    });
  }
};

exports.userWishlistDetailsController = async (req, res, next) => {
  let { userId } = req.query;

  let userx = await User.findOne({ _id: userId }).populate({
    path: "wishlistItems",
  });

  return res.json({
    wishlistItems: userx.wishlistItems,
  });
};

exports.userReviewsGetController = async (req, res, next) => {
  let { userId } = req.params;

  let userx = await User.findOne({ _id: userId }).populate({
    path: "reviews",
    populate: {
      path: "user",
      select: { profilePic: 1, name: 1 },
    },
  });

  res.json({
    userReviews: userx.reviews,
  });
};

exports.uploadProfilePicController = async (req, res, next) => {
  let { userId, imgUrl } = req.body;
  console.log(imgUrl);
  let userx = await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { profilePic: imgUrl },
    }
  );

  res.json({
    userx,
    msg: "Successfully,updated your profile pic",
    color: "success",
  });
};

exports.updatecartedProductController = async (req, res, next) => {
  let { cartedProduct, userId } = req.body;
  console.log(userId);
  await User.findOneAndUpdate(
    { _id: userId },
    {
      $set: { cartedItems: cartedProduct },
    }
  );

  return res.json({
    msg: "Update carted product to user database",
  });
};

exports.userCartedProductGetController = async (req, res, next) => {
  let { userId } = req.params;
  console.log(userId);
  let userx = await User.findOne({ _id: userId });

  res.json({
    cartedProduct: userx.cartedItems,
  });
};
