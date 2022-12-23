const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("./errorMiddleware")

const protect = async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id)

      next()
    } catch (error) {
      next(error)
    }
  }

  if (!token) {
    res.status(401)
    throw new ErrorHandler(403, "Not authorized, no token")
  }
}

const authorize = (role) => {
  return async (req, res, next) => {
    const user = req.user
    try {
      if (!user.roles.includes(role)) {
        throw new ErrorHandler(403, "You are not authorized to access this")
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { protect, authorize }
