const FB = require("../utils/firebase");
const User = require("../model/user");
const { extractToken } = require("../utils/helperFunc");
const { SendEmail } = require("../utils/mailer");

exports.nodeMailer = async (req, res, next) => {
  try {
    const conformation = SendEmail(req.body.dataV);
  } catch (err) {
    res.json({
      status: "error",
      message: err?.message,
    });
  }
};
exports.signup = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.accessToken) {
      res.json({ status: "failed", message: "Token not found !" });
      return;
    }
    const verified = await FB.verifyToken(body.accessToken);
    const data = {
      userName: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    const user = await User.create(data);
    res.json({
      status: "success",
      token: body.accessToken,
      user,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err?.message,
    });
  }
};
exports.refreshUser = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.accessToken) {
      res.json({ status: "failed", message: "Token not found !" });
      return;
    }
    const verified = await FB.verifyToken(body.accessToken);
    const user = await User.findOne({ email: verified.email });
    res.json({
      status: "success",
      token: body.accessToken,
      user,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err?.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const body = req.body;
    if (!body.accessToken) {
      return res.json({ status: "failed", message: "Token not found !" });
    }

    const verified = await FB.verifyToken(body.accessToken);
    if (!verified)
      return res.json({
        status: "failed",
        message: "Unauthorized token !",
      });
    const user = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    if (user?.isBlocked) {
      return res.json({
        status: "error",
        message: "you were blocked",
      });
    }
    if (user) {
      res.json({
        status: "success",
        user,
        token: body.accessToken,
      });
    }
  } catch (err) {
    res.json({
      status: "error",
      message: err?.message,
    });
  }
};

exports.googleSignup = async (req, res, next) => {
  try {
    const { userName, image, email, accessToken } = req.body;
    if (!accessToken) {
      res.json({ status: "failed", message: "Token not found !" });
      return;
    }
    const verified = await FB.verifyToken(accessToken);
    if (!verified)
      return res.json({
        status: "failed",
        message: "Unauthorized token !",
      });
    const user = await User.findOne({ email });
    if (user.isBlocked) {
      return res.json({
        status: "error",
        message: "you were blocked",
      });
    }
    if (user) {
      return res.json({
        status: "success",
        user,
        token: accessToken,
      });
    }
    const data = { userName, email, image };
    const newUser = await User.create(data);

    res.json({
      status: "success",
      user: newUser,
      token: accessToken,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: err?.message,
    });
  }
};

exports.checkIsAuth = async (req, res, next) => {
  try {
    // Extract token
    const token = extractToken(req);
    if (!token) {
      return res.json({ status: "failed", message: "Token not found !" });
    }

    // Verify token
    const verified = await FB.verifyToken(token);
    if (!verified)
      return res.json({
        status: "failed",
        message: "Unauthorized token !",
      });
    // get user info from DB
    const user = await User.findOne({ email: verified.email });
    if (user.isBlocked === true) {
      return res.json({
        status: "error",
        message: "you were blocked",
      });
    }
    // append user data on req as req.user
    req.user = user;
    next();
  } catch (err) {
    res.json({
      status: "failed",
      message: err?.message,
    });
  }
};
exports.checkIfAdmin = async (req, res, next) => {
  const { user } = req;
  if (user.role !== "admin") {
    return res.json({
      status: "error",
      message: "Unuthorized user !",
    });
  }
  next();
};
