const express = require("express")
const router = express.Router()
const { authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
} = require("../controllers/passController")

router.post("/generatePass", authorize(["admin"]), generatePass)
router.get("/viewPasses", authorize(["admin"]), viewPasses)
router.patch("/verifyPass", authorize(["guard"]), verifyPass)

module.exports = router
