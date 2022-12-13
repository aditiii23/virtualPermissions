const asyncHandler = require("express-async-handler")
require("dotenv").config()
const { connectDB, disconnectDB } = require("../config/db")
const User = require("../model/user.model")
const Pass = require("../model/pass.model")

//@desc Generate a pass by user
//@route POST /users/generatePass
const generatePass = asyncHandler(async (req, res) => {
  try {
    await connectDB()

    const { name, email, phone, duration, start, end } = req.body

    const passExists = await Pass.findOne({ email })
    if (passExists) {
      await disconnectDB()
      res.status(400).json({
        success: false,
        message: "Old pass still valid",
      })
    }
    const user = await User.findOne({ _id: req.user._id })

    const pass = await Pass.create({
      name,
      phone,
      email,
      duration,
      start,
      end,
      generateId: req.user._id,
      userName: req.user.name,
    })
    if (pass) {
      res.status(201).json({
        success: true,
        pass: pass,
        message: "Pass generated successfully",
      })
    }
  } catch (err) {
    console.log(err)
  }
})

module.exports = { generatePass }
