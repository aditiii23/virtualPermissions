const User = require("../model/user.model")
const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("./errorMiddleware")

const authorize = (role) => {
  return async (req, res, next) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        let token
        token = req.headers.authorization.split(" ")[1]
        if (!token) {
          throw new ErrorHandler(400, "Not authorized, no token")
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        const user = req.user
        let rolesExist = false
        if (role.includes(user.roles)) {
          rolesExist = true
        }
        if (rolesExist == false)
          throw new ErrorHandler(403, "You are not authorized to access this")

        next()
      } catch (error) {
        next(error)
      }
    }
  }
}

module.exports = { authorize }
