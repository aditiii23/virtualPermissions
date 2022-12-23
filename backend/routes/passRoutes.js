const express = require("express")
const router = express.Router()
const { protect, authorize } = require("../middleware/authMiddleware")

const { generatePass } = require("../controllers/passController")

router.post("/generatePass", protect, authorize("admin"), generatePass)

module.exports = router
