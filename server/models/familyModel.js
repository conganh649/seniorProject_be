const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.ObjectId, ref: "User", required: true }],
    neighborhood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighborhood",
      required: true,
    },
    culturalFamilyRating: { type: Number },
    inNeedFamilyRating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Family", userSchema);
