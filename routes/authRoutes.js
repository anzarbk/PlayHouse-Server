const {
  signup,
  login,
  googleSignup,
  nodeMailer,
} = require("../controllers/authController");

const router = require("express").Router();

// router.post("/node-mailer", nodeMailer);
router.post("/signup", signup);
router.post("/login", login);
router.post("/googleSignup", googleSignup);

module.exports = router;
