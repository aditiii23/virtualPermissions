const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const User = require("../model/user.model")

//@desc Register a new user
//@route POST /users/registerUser

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmpwd, phone } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(400)
      throw new Error("User already exists")
    }
    if (password != confirmpwd) {
      res.status(400)
      throw new Error("Passwords do not match")
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
    console.log(err)
  }
})

//@desc Auth user & get token
//@route POST /users/login

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: user,
        token: generateToken(user._id),
        message: "User login successfully",
      })
    }
  } catch (err) {
    console.log(err)
  }
})

//@desc Acknowledge user
//@route GET /users/view

const viewUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

module.exports = { registerUser, loginUser, viewUser }
