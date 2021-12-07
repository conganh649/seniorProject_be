const { stubString } = require("lodash");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDetail: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productThumbnail: { type: String, required: true },
      },
    ],
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["New", "Processing", "Shipping", "Complete"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
