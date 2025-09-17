var mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    doctorProfile: {
      specialization: {
        type: String,
        default: "",
      },
      experience: {
        type: Number,
        default: 0,
      },
      fee: {
        type: Number,
        default: 0,
      },
      startTime: {
        type: String,
      },
      endTime: {
        type: String,
      },
      isApproved: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

module.exports = User;
