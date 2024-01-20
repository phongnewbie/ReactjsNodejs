const DisplayUser = require("../controllers/DisplayUser")
const verifyTokens = require("../controllers/verifyToken")


const router = require("express").Router()

router.get("/",verifyTokens.verifyToken, DisplayUser.getAllUsers)
router.delete("/:_id", DisplayUser.deleteUser)
module.exports = router





