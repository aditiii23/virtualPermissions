const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
} = require("../controllers/passController")

router.post("/generatePass", protect, generatePass)

router.get("/viewPasses", protect, viewPasses)

router.put("/verifyPass/:_id", protect, verifyPass)

module.exports = router
