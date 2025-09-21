var express = require("express");
const {
  createAppointment,
  getAppointmentsByDoctor,
} = require("../controllers/appointment.controller");
const { protectRoute } = require("../middleware/auth.middleware");

var router = express.Router();

router.post("/create", protectRoute, createAppointment);

router.get("/doctor/:doctorId", protectRoute, getAppointmentsByDoctor);

module.exports = router;
