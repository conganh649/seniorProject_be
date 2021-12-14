const mongoose = require("mongoose");

const familySchema = new mongoose.Schema(
  {
    familyOwnerName: { type: String },
    familyOwnerIdCard: { type: String, required: true, unique: true },
    origin: { type: String, required: true },
    ethnic: { type: String, required: true },
    religion: { type: String, required: true },
    occupation: { type: String, required: true },
    members: [
      {
        memberId: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        memberIdCard: {
          type: String,
          required: true,
          unique: true,
        },
        memberName: {
          type: String,
          required: true,
        },
        origin: { type: String, required: true },
        ethnic: { type: String, required: true },
        religion: { type: String, required: true },
        occupation: { type: String, required: true },
      },
    ],
    address: { type: String, required: true },
    culturalFamilyRating: [
      {
        year: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Family", familySchema);
