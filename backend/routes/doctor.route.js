var express = require("express");
const {
  doctorRegister,
  fetchAllDoctors,
  fetchSingleDoctor,
} = require("../controllers/doctor.controller");
const { protectRoute } = require("../middleware/auth.middleware");

var router = express.Router();

router.post("/register", doctorRegister);

router.get("/", fetchAllDoctors);

router.get("/:id", protectRoute, fetchSingleDoctor);

module.exports = router;
