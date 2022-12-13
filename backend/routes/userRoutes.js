const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")
const {
  loginUser,
  registerUser,
  viewUser,
} = require("../controllers/userController")

const { generatePass } = require("../controllers/passController")

router.post("/registerUser", registerUser)
router.post("/login", loginUser)
router.get("/view", viewUser)
router.post("/generatePass", protect, generatePass)

module.exports = router
