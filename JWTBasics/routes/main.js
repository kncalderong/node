const express = require('express')
const router = express.Router()

const authMiddleware = require("../middleware/auth") //to use that authentication token process

const {dashboard,login} = require("../controllers/main")

router.route("/dashboard").get(authMiddleware,dashboard) //first pass the authentication process
router.route("/login").post(login)

module.exports = router