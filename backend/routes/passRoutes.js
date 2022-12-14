const express = require("express")
const router = express.Router()
const { protect } = require("../middleware/authMiddleware")

const { generatePass, viewPasses } = require("../controllers/passController")

router.post("/generatePass", protect, generatePass)

router.get("/viewPasses", protect, viewPasses)

module.exports = router
