var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var dotenv = require("dotenv");
dotenv.config();

var authRouter = require("./routes/auth.route.js");
var adminRouter = require("./routes/admin.route.js");
var doctorRouter = require("./routes/doctor.route.js");
const { connectDB } = require("./lib/db.js");

var app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.listen(5000, () => {
  console.log("App listening on port 5000!");
  connectDB();
});

module.exports = app;
