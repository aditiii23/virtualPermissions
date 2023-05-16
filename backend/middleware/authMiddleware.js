const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("./errorMiddleware")

const authorize = (roles) => {
  return async (req, res, next) => {
    try {
      if (
        !req.headers.authorization ||
        !req.headers.authorization.startsWith("Bearer")
      ) {
        throw new ErrorHandler(400, "Token missing!")
      }
      let token
      token = req.headers.authorization.split(" ")[1]
      if (!token) {
        throw new ErrorHandler(400, "Not authorized, no token")
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id)
      const user = req.user
      if (!roles.includes(user.role)) {
        throw new ErrorHandler(403, "You are not authorized to access this")
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { authorize }
