const router = require("express").Router();
const authController = require('../../controllers/auth/auth.controller');

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);


module.exports = router