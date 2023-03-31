const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("./errorMiddleware")

const authorize = (role) => {
  return async (req, res, next) => {
    try {
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        let token
        token = req.headers.authorization.split(" ")[1]
        if (!token) {
          throw new ErrorHandler(498, "No authorization token found")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id: decoded.id }, { roles: 1 })
        if (!req.user.roles.includes(role)) {
          throw new ErrorHandler(403, "You are not authorized to access this")
        }
        next()
      } else {
        throw new ErrorHandler(499, "No authorization token found")
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { authorize }
