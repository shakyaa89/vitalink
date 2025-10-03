var express = require("express");
const {
  createAppointment,
  getAppointmentsByDoctor,
  getAppointmentsByUser,
} = require("../controllers/appointment.controller");
const {
  protectRoute,
  protectAdminRoute,
} = require("../middleware/auth.middleware");

var router = express.Router();

router.post("/create", protectRoute, createAppointment);

router.get("/doctor/:doctorId", protectRoute, getAppointmentsByDoctor);

router.get("/user/:userId", protectRoute, getAppointmentsByUser);

module.exports = router;
