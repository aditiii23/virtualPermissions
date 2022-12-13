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
    generateId: {
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
      type: "String",
      required: true,
    },
    end: {
      type: "String",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Pass", passSchema)
