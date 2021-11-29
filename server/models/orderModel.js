const { stubString } = require("lodash");
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderDetail: [
      {
        quantity: { type: String, required: true },
        price: { type: String, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productThumbnail: { type: String },
      },
    ],
    totalPrice: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["pending", "resolving", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
