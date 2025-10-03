var express = require("express");
const {
  fetchAllUsers,
  fetchUnapprovedDoctors,
  approveDoctor,
  deleteDoctor,
  getAllAppointments,
  confirmAppointment,
  deleteAppointment,
  cancelAppointment,
  completeAppointment,
} = require("../controllers/admin.controller");
const { protectAdminRoute } = require("../middleware/auth.middleware");

var router = express.Router();

router.get("/users", protectAdminRoute, fetchAllUsers);

router.get("/unapproved-doctors", protectAdminRoute, fetchUnapprovedDoctors);

router.post("/approve/doctor/:id", protectAdminRoute, approveDoctor);

router.delete("/delete/doctor/:id", protectAdminRoute, deleteDoctor);

router.get("/appointment/all", protectAdminRoute, getAllAppointments);

router.post("/approve/appointment/:id", protectAdminRoute, confirmAppointment);

router.put("/complete/appointment/:id", protectAdminRoute, completeAppointment);

router.put("/cancel/appointment/:id", protectAdminRoute, cancelAppointment);

router.delete("/delete/appointment/:id", protectAdminRoute, deleteAppointment);

module.exports = router;
