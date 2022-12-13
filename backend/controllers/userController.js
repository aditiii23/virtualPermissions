const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const User = require("../model/user.model")

//@desc Register a new user
//@route POST /users/registerUser

const registerUser = asyncHandler(async (req, res) => {
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
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

//@desc Auth user & get token
//@route POST /users/login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

module.exports = { registerUser, loginUser }
