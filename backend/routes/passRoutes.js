const express = require("express")
const router = express.Router()
const { protect, authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
} = require("../controllers/passController")

router.post("/generatePass", protect, authorize("admin"), generatePass)

router.get("/viewPasses", protect, authorize("admin"), viewPasses)

router.put("/verifyPass/:_id", protect, authorize("guard"), verifyPass)

module.exports = router
