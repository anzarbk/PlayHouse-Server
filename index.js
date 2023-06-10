const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const commonRoutes = require("./routes/commonRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { checkIfAdmin, checkIsAuth } = require("./controllers/authController");
const mongoose = require("./database");
const conn = require("./database");
const app = express();

app.use(
  cors({
    origin: ["https://playhousenow.online"],
    // origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    // credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/", commonRoutes);
app.use("/auth", authRoutes);
app.use("/admin", checkIsAuth, checkIfAdmin, adminRoutes);

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} `);
});
module.exports = app;
