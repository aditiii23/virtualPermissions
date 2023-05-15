const generateToken = require("../utils/generateToken")
const { ErrorHandler } = require("../middleware/errorMiddleware")
const User = require("../model/user.model")

//@desc Register a new user
//@route POST /users/registerUser

const registerUser = async (req, res, next) => {
  try {
    const { name, password, confirmpwd, phone } = req.body
    let email = req.body.email?.toLowerCase()
    if (!email?.length)
      throw new ErrorHandler(400, "Please enter a valid email address")
    if (password != confirmpwd) {
      throw new ErrorHandler(400, "Passwords do not match")
    }
    const userExists = await User.findOne({ email })

    if (userExists) {
      throw new ErrorHandler(409, "User already exists, try login")
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
}

//@desc Auth user & get token
//@route POST /users/login

const loginUser = async (req, res, next) => {
  try {
    const { password } = req.body
    let email = req.body.email?.toLowerCase()
    if (!email?.length)
      throw new ErrorHandler(400, "Please enter a valid email address")

    const user = await User.findOne({ email })

    if (!user) {
      throw new ErrorHandler(404, "No user exists! Please Register")
    } else if (user && (await user.matchPassword(password))) {
      res.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
        },
        token: generateToken(user._id),
        message: "User login successfully",
      })
    } else throw new ErrorHandler(409, "Wrong Password")
  } catch (err) {
    next(err)
  }
}

module.exports = { registerUser, loginUser }
