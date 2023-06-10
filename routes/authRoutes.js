const {
  signup,
  login,
  googleSignup,
  nodeMailer,
  refreshUser,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/googleSignup", googleSignup);
router.post("/refresh", refreshUser);

module.exports = router;
