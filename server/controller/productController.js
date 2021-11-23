const Product = require("../models/productModel");

exports.getAll = async (req, res) => {
  const productList = await Product.find().populate("category").exec();
  if (!productList) {
    res.status(500).json({ success: false });
  }
  res.send(productList);
};

exports.getOne = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate("category")
    .exec();
  if (!product) {
    res.status(500).json({ success: false });
  }
  res.send(product);
};

exports.create = async (req, res) => {
  let product = new Product({
    productName: req.body.productName,
    productThumbnail: req.body.productThumbnail,
    description: req.body.description,
    price: req.body.price,
    status: req.body.status,
    quantity: req.body.quantity,
    category: req.body.category,
  });
  product = await product.save(product);
  if (!product) return res.status(500).send("The product cannot be created");
  res.send(product);
};

exports.update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      productName: req.body.productName,
      productThumbnail: req.body.productThumbnail,
      description: req.body.description,
      price: req.body.price,
      status: req.body.status,
      quantity: req.body.quantity,
      category: req.body.category,
    },
    {
      new: true,
    }
  );
  if (!product) return res.status(500).send("The product can't be updated!");
  res.send(product);
};

exports.delete = async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "Delete product successfully!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product not found!" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
};
