const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    productThumbnail: { type: String },
    description: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
