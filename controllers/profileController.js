const User = require("../model/user");
const { extractToken } = require("../utils/helperFunc");

exports.editProfile = async (req, res) => {
  try {
    const body = req.body;
    console.log(body, req.user._id.toString());


    console.log(req.user);
    const id = req.user._id.toString();

    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          userName: body.userName,
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
          mobileNumber: body.phone,
          age: body.age,
          areaPinCode: body.pinCode,
          addressLine1: body.addressLine1,
          addressLine2: body.addressLine2,
          town: body.town,
          state: body.state,
        },
      },
      { new: true, runValidators: true }
    );

    const redux = await User.find({ _id: id });
    res.json({
      status: "success",
      redux,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
  }
};

exports.editProfileImage = async (req, res) => {
  try {
    const { image } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { image },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
exports.getUserData = async (req, res) => {
  try {
    const user = await User.find();
    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
exports.getUserOnlyData = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });
    let newUser;
    if (user.isBlocked === true) {
      newUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          isBlocked: false,
        },
        { new: true }
      );
    } else {
      newUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          isBlocked: true,
        },
        { new: true }
      );
    }

    res.json({
      status: "success",
      newUser,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
