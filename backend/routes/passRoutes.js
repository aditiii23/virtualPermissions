const express = require("express")
const router = express.Router()
const { authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
  viewUnverifiedPasses
} = require("../controllers/passController")

router.post("/generatePass", authorize("guard"), generatePass)
router.get("/viewPasses", authorize("guard"), viewPasses)
router.put("/verifyPass/:_id", authorize("guard"), verifyPass)
router.get("/viewUnverifiedPass", authorize("guard"), viewUnverifiedPasses)

module.exports = router
