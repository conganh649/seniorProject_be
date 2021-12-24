const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_I = 10;

const userSchema = new mongoose.Schema(
  {
    idCard: { type: String, required: true, trim: true, unique: true },
    fullName: { type: String },
    phoneNumber: { type: String },
    password: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    gender: { type: String, enum: ["Male", "Female"] },
    dateofbirth: { type: Date, default: Date.now },
    role: {
      type: String,
      enum: ["User", "Manager"],
      default: "User",
    },
    cartDetail: [
      {
        name: { type: String },
        quantity: { type: String },
        price: { type: String },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        productThumbnail: { type: String },
      },
    ],
    notification: [
      {
        title: { type: String },
        body: { type: String },
        createdDate: { type: Date, default: Date.now },
      },
    ],
    newNoti: { type: Boolean, default: false },
    fcm_token: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(SALT_I, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
