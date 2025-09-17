var express = require("express");
const {
  doctorRegister,
  fetchAllDoctors,
} = require("../controllers/doctor.controller");

var router = express.Router();

router.post("/register", doctorRegister);

router.get("/", fetchAllDoctors);

module.exports = router;
