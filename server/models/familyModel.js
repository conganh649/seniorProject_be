const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    familyName: { type: String },
    familyOwnerId: { type: String, required: true, unique: true },
    members: [
      {
        memberId: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        memberName: {
          type: String,
          required: true,
        },
      },
    ],
    neighborhood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Neighborhood",
      required: true,
    },
    address: { type: String, required: true },
    culturalFamilyRating: { type: Number },
    inNeedFamilyRating: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Family", familySchema);
