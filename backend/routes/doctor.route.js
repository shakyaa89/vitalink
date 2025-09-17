var express = require("express");
const { doctorRegister } = require("../controllers/doctor.controller");

var router = express.Router();

router.post("/register", doctorRegister);

module.exports = router;
