var express = require("express");
const {
  fetchAllUsers,
  fetchUnapprovedDoctors,
  fetchAllDoctors,
  approveDoctor,
  deleteDoctor,
} = require("../controllers/admin.controller");
const { protectAdminRoute } = require("../middleware/auth.middleware");

var router = express.Router();

router.get("/users", protectAdminRoute, fetchAllUsers);

router.get("/unapproved-doctors", protectAdminRoute, fetchUnapprovedDoctors);

router.get("/doctors", protectAdminRoute, fetchAllDoctors);

router.post("/approve/doctor/:id", protectAdminRoute, approveDoctor);

router.delete("/delete/doctor/:id", protectAdminRoute, deleteDoctor);

module.exports = router;
