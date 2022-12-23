const express = require("express")
const router = express.Router()
const { protect, authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
} = require("../controllers/passController")

router.post("/generatePass", authorize("admin"), generatePass)
router.get("/viewPasses", authorize("admin"), viewPasses)
router.put("/verifyPass/:_id", authorize("guard"), verifyPass)

module.exports = router
