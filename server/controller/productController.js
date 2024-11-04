const Product = require("../model/product");

exports.createProductController = async (req, res, next) => {
  let { title, description, price, priceOff, brand, category, qty, img } =
    req.body;

  console.log(req.body);
  let newProduct = new Product({
    title,
    description,
    price,
    priceOff,
    brand,
    category,
    remain: qty,
    img,
    reviews: [],
  });

  try {
    await newProduct.save();
    res.json({
      msg: "Successfully,created a product",
      color: "success",
    });
  } catch {
    res.json({
      msg: "Failed to create product",
      color: "danger",
    });
  }
};

exports.getAllProductController = async (req, res, next) => {
  let all = await Product.find();

  res.json({
    allProduct: all,
  });
};

exports.getSingleProduct = async (req, res, next) => {
  let { id } = req.params;
  let product = await Product.findOne({ _id: id });

  res.json({
    singleProduct: product,
  });
};

exports.editSingleProductController = async (req, res, next) => {
  let { title, description, price, priceOff, brand, category, qty, img } =
    req.body;
  let { id } = req.params;
  console.log(req.body);
  await Product.findOneAndUpdate(
    { _id: id },
    { $set: { title, description, price, priceOff, brand, category, qty, img } }
  );

  try {
    res.status(200).json({
      msg: "Successfully,updated product",
      color: "success",
    });
  } catch {
    res.status(200).json({
      msg: "failed to update product",
      color: "danger",
    });
  }
};

exports.productSearchControllerThroughText = async (req, res, next) => {
  let { text } = req.params;

  let searchedProducts = await Product.find({ $text: { $search: text } });

  res.json({
    searchedProducts,
  });
};
