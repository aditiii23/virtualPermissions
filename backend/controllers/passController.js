const asyncHandler = require("express-async-handler")
require("dotenv").config()
const { connectDB } = require("../config/db")
const User = require("../model/user.model")
const Pass = require("../model/pass.model")
const { ErrorHandler } = require("../middleware/errorMiddleware")

//@desc Generate a pass by user
//@route POST /users/generatePass
const generatePass = asyncHandler(async (req, res, next) => {
  try {
    await connectDB()
    const { name, email, phone, duration, start } = req.body

    const user = await User.findOne({ _id: req.user._id })
    if (user) {
      // console.log(user);
      const newPass = await Pass.create({
        name,
        phone,
        email,
        duration,
        start,
        checkInStatus: false,
        generatedUserId: user.id,
        userName: req.user.name,
      })
      if (newPass) {
        res.status(201).json({
          success: true,
          newPass: newPass,
          message: "Pass generated successfully",
        })
      }
    } else {
      throw new ErrorHandler(401, "Signup to create Pass!")
    }
  } catch (err) {
    next(err)
  }
})

module.exports = { generatePass }
