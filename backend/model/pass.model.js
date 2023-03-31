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
    generatedUserName: {
      type: mongoose.Schema.Types.String,
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
      type: "String",
      required: true,
    },
    checkInTime: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
)

const Pass = mongoose.model("Pass", passSchema)
module.exports = Pass
