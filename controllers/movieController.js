const User = require("../model/user");
const Theatre = require("../model/theatre");
const Movie = require("../model/movie");

exports.createMovie = async (req, res) => {
  //   try {
  //     const body = req.body;
  //     const id = req.user._id.toString();
  //     const data = {
  //       name: body.theatreName,
  //       location: body.location,
  //       user: id,
  //       facilities: body.facilities,
  //       about: body.about,
  //       address: body.address,
  //       state: body.state,
  //       town: body.town,
  //       pincode: body.pinCode,
  //     };
  //     const theatreRedux = await Theatre.create(data);
  //     const userRedux = await User.updateOne(
  //       { _id: id },
  //       {
  //         $set: {
  //           role: "theatre",
  //         },
  //       },
  //       { new: true, runValidators: true }
  //     );
  //     res.json({
  //       status: "success",
  //       userRedux,
  //       theatreRedux,
  //     });
  //   } catch (error) {
  //     res.json({
  //       status: "failed",
  //       error,
  //     });
  //     console.log(error);
  //   }
};
exports.editMovie = async (req, res) => {
  //   try {
  //     const body = req.body;
  //     const id = req.user._id.toString();
  //     const theatre = await Theatre.updateOne(
  //       { _id: id },
  //       {
  //         $set: {
  //           name: body.theatreName,
  //           location: body.location,
  //           user: id,
  //           facilities: body.facilities,
  //           about: body.about,
  //           address: body.address,
  //           state: body.state,
  //           town: body.town,
  //           pincode: body.pinCode,
  //         },
  //       },
  //       { new: true, runValidators: true }
  //     );
  //     const theatreRedux = await Theatre.find({ user: id });
  //     res.json({
  //       status: "success",
  //       theatreRedux,
  //     });
  //   } catch (error) {
  //     res.json({
  //       status: "failed",
  //       error,
  //     });
  //     console.log(error);
  //   }
};

exports.movieEditImage = async (req, res) => {
  try {
    const { image, banner } = req.body;
    const id = req.user._id.toString();
    const movieRedux = await Movie.findOneAndUpdate(
      { user: id },
      { image, banner },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      movieRedux,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
exports.movieGetData = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const theatre = await Theatre.find({ user: id });
  //     res.json({
  //       status: "success",
  //       theatre,
  //     });
  //   } catch (error) {
  //     return res.json({
  //       status: "failed",
  //       message: "Something went wrong !",
  //     });
  //   }
};
