
const Authentication = require("../controllers/Authentication")

const router = require("express").Router();
const verifyToken = require("../controllers/verifyToken")
//REGISTER
router.post("/register", Authentication.registerUser)
//LOGIN
router.post("/login",Authentication.loginFunction)



//REFRESH TOKEN
router.post("/refresh",Authentication.requestRefreshToken)



//logout
router.post("/logout", verifyToken.verifyToken ,Authentication.userLogout)


module.exports = router;