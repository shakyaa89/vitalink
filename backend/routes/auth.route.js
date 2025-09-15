var express = require("express");
const {
  registerController,
  loginController,
  logoutController,
  checkAuth,
} = require("../controllers/auth.controller");
const { protectRoute } = require("../middleware/auth.middleware");
var router = express.Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/logout", logoutController);

router.get("/check", protectRoute, checkAuth);

module.exports = router;
