const express = require("express")
const router = express.Router()
const {
  loginUser,
  registerUser,
  viewUser,
} = require("../controllers/userController")

router.post("/registerUser", registerUser)
router.post("/login", loginUser)
router.get("/view", viewUser)

module.exports = router
