const express = require("express")
const router = express.Router()
const { authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
  viewUnverifiedPasses
} = require("../controllers/passController")

router.post("/generatePass", authorize("admin"), generatePass)
router.get("/viewPasses", authorize("admin"), viewPasses)
router.put("/verifyPass/:_id", authorize("guard"), verifyPass)
router.get("/viewUnverifiedPass", authorize("guard"), viewUnverifiedPasses)

module.exports = router
