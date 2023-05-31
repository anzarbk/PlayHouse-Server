const User = require("../model/user");
const { extractToken } = require("../utils/helperFunc");

exports.editProfile = async (req, res) => {
  try {
    const body = req.body;
    console.log(body, req.user._id.toString());

    // if (
    //   !body.userName ||
    //   !body.email ||
    //   !body.firstName ||
    //   !body.lastName ||
    //   !body.age ||
    //   !body.addressLine1 ||
    //   !body.addressLine2 ||
    //   !body.state ||
    //   !body.town ||
    //   !body.pincode ||
    //   !body.phone
    // ) {
    //   return res.json({
    //     status: "error",
    //   });
    // }

    // const data = {
    //   userName: body.userName,
    //   email: body.email,
    //   firstName: body.firstName,
    //   lastName: body.lastName,
    //   mobileNumber: body.phone,
    //   age: body.age,
    //   areaPinCode: body.pinCode,
    //   addressLine1: body.addressLine1,
    //   addressLine2: body.addressLine2,
    //   town: body.town,
    //   state: body.state,
    // };
    console.log(req.user);
    const id = req.user._id.toString();
    // const user = await User.findByIdAndUpdate( id, data, {
    //   new: true,
    //   runValidators: true,
    // });
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
    console.log(user, "qrrtweqr");

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
    console.log(error);
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
  console.log(req.params.id, "adsadasdasd");
  try {
    const user = await User.findOne({ _id: id });
    console.log(user);
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
    console.log(newUser, "after");

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
