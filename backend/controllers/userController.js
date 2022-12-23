const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const { ErrorHandler } = require("../middleware/errorMiddleware")
const User = require("../model/user.model")

//@desc Register a new user
//@route POST /users/registerUser

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, confirmpwd, phone } = req.body

    const userExists = await User.findOne({ email })

    if (password != confirmpwd) {
      throw new ErrorHandler(403, "Passwords do not match")
    }

    if (userExists) {
      throw new ErrorHandler(403, "User already exists, try login")
    }

    const user = await User.create({
      name,
      email,
      password,
      phone,
    })

    if (user) {
      res.status(201).json({
        success: true,
        user: user,
        token: generateToken(user._id),
        message: "User registered successfully",
      })
    }
  } catch (err) {
    next(err)
  }
})

//@desc Auth user & get token
//@route POST /users/login

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      throw new ErrorHandler(404, "No user exists! Please Register")
    } else if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: user,
        token: generateToken(user._id),
        message: "User login successfully",
      })
    }
  } catch (err) {
    next(err)
  }
})

module.exports = { registerUser, loginUser }
