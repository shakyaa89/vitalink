var express = require("express");
const { fetchAllUsers } = require("../controllers/admin.controller");
const { protectAdminRoute } = require("../middleware/auth.middleware");

var router = express.Router();

router.get("/users", protectAdminRoute, fetchAllUsers);

module.exports = router;
