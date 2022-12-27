const { connectDB } = require("../config/db")
const User = require("../model/user.model")
const Pass = require("../model/pass.model")
const { ErrorHandler } = require("../middleware/errorMiddleware")

//@desc Generate a pass by user
//@route POST /users/generatePass
const generatePass = async (req, res, next) => {
  try {
    const { name, email, phone, duration, start } = req.body

    const user = await User.findOne({ _id: req.user._id })
    const newPass = await Pass.create({
      name,
      phone,
      email,
      duration,
      start,
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
  } catch (err) {
    console.log(err)
    next(err)
  }
}

//@desc View all passes generated by a user
//@route Get /users/viewPasses
const viewPasses = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)

    const passes = await Pass.find({ generatedUserId: user.id })

    if (passes.length > 0) {
      res.status(201).json({
        success: true,
        passes: passes,
        message: "Passes fetched successfully",
      })
    }
  } catch (err) {
    next(err)
  }
}

//@desc Verify pass by guard
//@route PUT /users/verifyPass
const verifyPass = async (req, res, next) => {
  try {
    const passVerified = await Pass.findOneAndUpdate(
      { _id: req.params._id },
      {
        checkInTime: new Date(),
      }
    )
    res.status(201).json({
      success: true,
      passVerified: passVerified,
      message: "Pass verified successfully",
    })
  } catch (err) {
    next(err)
  }
}

module.exports = { generatePass, viewPasses, verifyPass }
