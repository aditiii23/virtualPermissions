const mongoose = require("mongoose")

const passSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    generatedUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    checkInTime: {
      type: Date,
      default: "",
    },
    OTP: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const Pass = mongoose.model("Pass", passSchema)
module.exports = Pass
