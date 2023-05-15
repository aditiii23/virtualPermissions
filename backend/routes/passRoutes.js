const express = require("express")
const router = express.Router()
const { authorize } = require("../middleware/authMiddleware")

const {
  generatePass,
  viewPasses,
  verifyPass,
} = require("../controllers/passController")

router.post("/generatePass", authorize(["admin", "user"]), generatePass)
router.get("/viewPasses", authorize(["admin", "user"]), viewPasses)
router.patch("/verifyPass", authorize(["guard", "admin"]), verifyPass)

module.exports = router
