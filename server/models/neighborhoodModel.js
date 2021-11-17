const mongoose = require("mongoose");

const neighborhoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    ward: { type: String, required: true },
    district: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Neighborhood", userSchema);
