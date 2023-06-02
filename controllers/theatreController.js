const User = require("../model/user");
const Theatre = require("../model/theatre");
const Show = require("../model/show");
const SeatCharter = require("../model/seatCharter");
const showTime = require("../model/showTime");
const { datesArr } = require("../utils/dateSplitter");
const Movie = require("../model/movie");
const Ticket = require("../model/ticket");

exports.createTheatre = async (req, res) => {
  try {
    const body = req.body;
    const id = req.user._id.toString();
    const data = {
      name: body.theatreName,
      location: body.location,
      user: id,
      facilities: body.facilities,
      about: body.about,
      address: body.address,
      state: body.state,
      town: body.town,
      pincode: body.pinCode,
    };
    const theatreRedux = await Theatre.create(data);
    // const userRedux = await User.updateOne(
    //   { _id: id },
    //   // {
    //   //   $set: {
    //   //     role: "theatre",
    //   //   },
    //   // },
    //   { new: true, runValidators: true }
    // );
    // console.log(userRedux);
    res.json({
      status: "success",
      // userRedux,
      theatreRedux,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.editTheatre = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    const id = req.user._id.toString();
    console.log(id);
    const theatre = await Theatre.updateOne(
      { user: id },
      {
        $set: {
          name: body.theatreName,
          location: body.location,
          user: id,
          facilities: body.facilities,
          about: body.about,
          address: body.address,
          state: body.state,
          town: body.town,
          pincode: body.pinCode,
        },
      },
      { new: true, runValidators: true }
    );
    console.log(theatre);
    const theatreRedux = await Theatre.find({ user: id });
    console.log(theatreRedux);
    res.json({
      status: "success",
      theatreRedux,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};

exports.theatreEditImage = async (req, res) => {
  try {
    const { image, banner } = req.body;
    const id = req.user._id.toString();
    const theatreRedux = await Theatre.findOneAndUpdate(
      { user: id },
      { image, banner },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      theatreRedux,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
exports.theatreGetData = async (req, res) => {
  try {
    const id = req.params.id;
    const theatre = await Theatre.find({ user: id });
    res.json({
      status: "success",
      theatre,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};
exports.getAlltheatre = async (req, res) => {
  console.log("out");
  try {
    const theatre = await Theatre.find();
    console.log(theatre);
    res.json({
      status: "success",
      theatre,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};

exports.getTheatreOnlyData = async (req, res) => {
  const id = req.params.id;
  console.log(req.params.id, "adsadasdasd");
  try {
    const theatre = await Theatre.findOne({ _id: id });
    console.log(theatre, "qweqwe");
    const userId = theatre.user;
    // let newTheatre;
    // if (theatre.isBlocked) {
    const newTheatre = await Theatre.findOneAndUpdate(
      {
        _id: id,
      },
      {
        isBlocked: !theatre.isBlocked,
      },
      { new: true }
    );
    const userRedux = await User.updateOne(
      { _id: userId },
      {
        $set: {
          role: newTheatre.isBlocked ? "user" : "theatre",
        },
      },
      { new: true, runValidators: true }
    );
    console.log(userRedux);
    // } else {
    //   newTheatre = await Theatre.findOneAndUpdate(
    //     {
    //       _id: id,
    //     },
    //     {
    //       isBlocked: true,
    //     },
    //     { new: true }
    //   );
    //   const userRedux = await User.updateOne(
    //     { _id: userId },
    //     {
    //       $set: {
    //         role: "user",
    //       },
    //     },
    //     { new: true, runValidators: true }
    //   );
    //   console.log(userRedux);
    // }
    console.log(newTheatre, "after");

    res.json({
      status: "success",
      newTheatre,
    });
  } catch (error) {
    return res.json({
      status: "failed",
      message: "Something went wrong !",
    });
  }
};

exports.createSeatCharter = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;

    const seatCharter = await SeatCharter.create({
      theatre: theatreId,
      seatCharter: req.body.seats,
      screenName: req.body.screenName,
    });

    res.json({
      status: "success",
      seatCharter,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};

exports.updateSeatCharter = async (req, res) => {
  try {
    // console.log(req.body);
    const seat = await SeatCharter.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      {
        $set: {
          screenName: req.body.screenName,
          seatCharter: req.body.seats,
        },
      }
    );
    console.log(seat);
    // const userId = req.user._id.toString();
    // const theatre = await Theatre.findOne({ user: userId });
    // const theatreId = theatre._id;
    // const seatCharter = await SeatCharter.create({
    //   theatre: theatreId,
    //   seatCharter: req.body.seats,
    //   screenName: req.body.screenName,
    // });
    res.json({
      status: "success",
      seat,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getSeatChart = async (req, res) => {
  try {
    const seatcharter = await SeatCharter.find({ theatre: req.params.id });
    console.log("asdasdas", seatcharter);
    res.json({
      status: "success",
      seatcharter,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.createShow = async (req, res) => {
  try {
    console.log(req.body, "qwe");
    if (
      !req.body.startate ||
      !req.body.endDate ||
      !req.body.movie ||
      !req.body.price ||
      !req.body.screen ||
      !req.body.show
    ) {
      return res.json({
        status: "failed",
        message: "invalid input please check ! ",
      });
    }
    const dateString1 = req.body.startate;
    const dateString2 = req.body.endDate;
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    const day1 = date1.getUTCDate();
    const day2 = date2.getUTCDate();
    if (day1 === day2) {
      return res.json({
        status: "failed",
        message: "same dates are not allowed !",
      });
    }
    //
    if (req.body.price < 10) {
      return res.json({
        status: "failed",
        message: "Price should not less than 10 !",
      });
    }
    const showsToCheck = await Show.find();

    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;
    // console.log(theatreId, "ASDASDASDASD");
    const showTime = req.body.show;
    const dates = datesArr(req.body.startate, req.body.endDate);
    // console.log(dates, "QWEQWEQWEQEWQQ");
    const seat = await SeatCharter.findOne({ screenName: req.body.screen });
    console.log("seatArrays", seat);
    const showsToAdd = [];
    dates.forEach((date) => {
      showTime.forEach((time) => {
        showsToAdd.push({
          theatre: theatreId,
          movie: req.body.movie,
          Date: date,
          show: time,
          price: req.body.price,
          screen: seat,
        });
      });
    });
    const newShow = await Show.insertMany(showsToAdd);
    const movieId = req.body.movie.id;
    const movies = await Movie.findOne({ movieId: movieId });
    if (!movies?.id) {
      const movie = await Movie.create({
        movieId: movieId,
        backdrop_path: req.body.movie.backdrop_path,
        genre: req.body.movie.genre_ids,
        original_language: req.body.movie.original_language,
        original_title: req.body.movie.original_title,
        popularity: req.body.movie.popularity,
        overview: req.body.movie.overview,
        poster_path: req.body.movie.poster_path,
        release_date: req.body.movie.release_date,
        title: req.body.movie.title,
      });
    }
    res.json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "failed",
      error,
    });
  }
};

exports.getShowData = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;
    const show = await Show.find({ theatre: theatreId });
    console.log(show);
    if (show) {
      return res.json({
        status: "success",
        show,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getShowDataById = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;
    const show = await Show.find({ _id: id }).populate();
    console.log(show);
    if (show) {
      return res.json({
        status: "success",
        show,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getDbMovie = async (req, res) => {
  try {
    // const userId = req.user._id.toString();
    const movies = await Movie.find();
    if (movies) {
      return res.json({
        status: "success",
        movies,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getSpecificTheatre = async (req, res) => {
  const id = parseInt(req.params.id);
  console.log(id);

  try {
    const userId = req.user._id.toString();
    const shows = await Show.find({ "movie.id": id }).populate("theatre");
    console.log(shows);
    if (shows) {
      return res.json({
        status: "success",
        shows,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.createTicket = async (req, res) => {
  try {
    console.log("ticket requests", req.body);
    const userId = req.user._id.toString();
    const showId = req.body.show._id;
    if (
      // !userId
      !req.body.orderID ||
      !userId ||
      !req.body.movieName ||
      !req.body.movieDate ||
      !req.body.movieTheatre ||
      // !req.body.movieScreen ||
      !req.body.movieShowTime ||
      !req.body.newAmount ||
      !req.body.seatNameArray
    ) {
      return res.json({
        status: "failed",
      });
    }
    if (req.body.orderID === showId) {
      const ticket = await Ticket.create({
        orderID: req.body.orderID,
        userId: userId,
        movieName: req.body.movieName,
        movieDate: req.body.movieDate,
        movieTheatre: req.body.movieTheatre,
        movieScreen: req.body.movieScreen,
        movieShowTime: req.body.movieShowTime,
        movieShowId: showId,
        paymentMethod: "wallet",
        newAmount: req.body.newAmount,
        seatNameArray: req.body.seatNameArray,
      });
      // console.log("ticket", ticket);
      const show = req.body.show;

      // console.log(showId);
      const seats = req.body.seats;
      for (let i = 0; i < seats.length; i++) {
        if (seats[i].isSelected) {
          seats[i].isBooked = true;
          seats[i].isSelected = false;
        }
      }

      // console.log("seat updated", seats);
      const shows = await Show.findOneAndUpdate(
        { _id: show._id },
        { screen: { seatCharter: seats } }
      );
      // console.log(shows);
      const user1 = await User.findOne({ _id: userId });
      const walletAmount = user1.wallet;
      console.log(walletAmount);
      const totalPrice = walletAmount - req.body.newAmount;
      console.log(totalPrice);
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          wallet: totalPrice,
        }
      );
      console.log("user-wallet", user);

      res.json({
        status: "success",
        ticket,
        shows,
        user,
      });
    } else {
      const ticket = await Ticket.create({
        orderID: req.body.orderID,
        userId: userId,
        movieName: req.body.movieName,
        movieDate: req.body.movieDate,
        movieTheatre: req.body.movieTheatre,
        movieScreen: req.body.movieScreen,
        movieShowTime: req.body.movieShowTime,
        movieShowId: showId,
        paymentMethod: "PayPal",
        newAmount: req.body.newAmount,
        seatNameArray: req.body.seatNameArray,
      });
      console.log("ticket", ticket);
      const show = req.body.show;

      // console.log(showId);
      const seats = req.body.seats;
      for (let i = 0; i < seats.length; i++) {
        if (seats[i].isSelected) {
          seats[i].isBooked = true;
          seats[i].isSelected = false;
        }
      }

      console.log("seat updated", seats);
      const shows = await Show.findOneAndUpdate(
        { _id: show._id },
        { screen: { seatCharter: seats } }
      );
      console.log(shows);

      res.json({
        status: "success",
        ticket,
        shows,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getScreenData = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;
    const screen = await SeatCharter.find({ theatre: theatreId });
    if (screen) {
      return res.json({
        status: "success",
        screen,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getChartData = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreName = theatre.name;
    const today = new Date();
    console.log(today);
    const aWeekBefore = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    // console.log(aWeekBefore);
    var currentDate = new Date();
    var lastWeekStartDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 7
    );
    var lastWeekEndDate = currentDate;
    const tickets = await Ticket.aggregate([
      {
        $match: {
          movieTheatre: theatreName,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);
    console.log(tickets);
    res.json({
      status: "success",
      tickets,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.createShowTime = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    console.log(req.body, userId);
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;
    if (theatreId) {
      data = {
        theatre: theatreId,
        showName: req.body?.showName,
        startTime: req.body?.start,
        endTime: req.body?.end,
      };
      console.log(data);
      const sTime = new showTime(data);
      await sTime.save();
      console.log("asdasdas", sTime);
      res.json({
        status: "success",
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getShowTime = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const theatre = await Theatre.findOne({ user: userId });
    const theatreId = theatre._id;
    if (theatreId) {
      const sTime = await showTime.find({ theatre: theatreId });
      res.json({
        status: "success",
        sTime,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.deleteScreen = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "asdasdasdas");
    // const userId = req.user._id.toString();
    // const theatre = await Theatre.findOne({ user: userId });
    // const theatreId = theatre._id;
    const screen = await SeatCharter.deleteOne({ _id: id });
    console.log(screen);
    res.json({
      status: "success",
      screen,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.deleteShowTime = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "asdasdasdas");
    // const userId = req.user._id.toString();
    // const theatre = await Theatre.findOne({ user: userId });
    // const theatreId = theatre._id;
    const sTime = await showTime.deleteOne({ _id: id });
    console.log(sTime);
    res.json({
      status: "success",
      sTime,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.deleteShow = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id, "asdasdasdas");

    // const userId = req.user._id.toString();
    // const theatre = await Theatre.findOne({ user: userId });
    // const theatreId = theatre._id;
    const show = await Show.deleteOne({ _id: id });
    console.log(show);
    res.json({
      status: "success",
      show,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getSingleSeatChart = async (req, res) => {
  try {
    const Id = req.params.id;
    const seat = await SeatCharter.findOne({ _id: Id });
    res.json({
      status: "success",
      seat,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getSingleSeatChartByName = async (req, res) => {
  try {
    const Id = req.params.id;
    console.log(Id);
    const seat = await SeatCharter.findOne({ screenName: Id });

    res.json({
      status: "success",
      seat,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.deleteTicket = async (req, res) => {
  try {
    const { ticketId, showId } = req.body;
    const ticket = await Ticket.findOne({ _id: ticketId });
    const price = ticket.newAmount;
    const seatArray = ticket.seatNameArray;
    console.log(price);
    const userId = req.user._id.toString();
    const user1 = await User.findOne({ _id: userId });
    const walletAmount = user1.wallet;
    console.log(walletAmount);
    const totalPrice = walletAmount + price;
    console.log(totalPrice);
    const user = await User.findOneAndUpdate(
      { _id: userId },
      {
        wallet: totalPrice,
      },
      { new: true }
    );
    console.log("user-wallet", user);
    const deleteTicket = await Ticket.findByIdAndDelete(ticketId);
    const shows = await Show.findOne({ _id: showId });
    // console.log(shows);
    const seat = shows.screen.seatCharter;
    // console.log(seat);

    const results = seatArray.map((element) => isElementInArray(element, seat));
    function isElementInArray(element, array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].seatNumber === element) {
          array[i].isBooked = false;
        }
      }
      return array;
    }
    // console.log(results);

    const show = await Show.findOneAndUpdate(
      { _id: showId },
      { screen: { seatCharter: seat } },
      { new: true }
    );

    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getTicketList = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    if (userId) {
      const tickets = await Ticket.find({ userId: userId })
        .sort({ _id: -1 })
        .limit(5);
      console.log(tickets);
      res.json({
        status: "success",
        tickets,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getTicket = async (req, res) => {
  try {
    const Id = req.query.id;
    if (Id) {
      const ticket = await Ticket.findOne({ _id: Id }).populate("movieShowId");
      console.log(ticket);
      res.json({
        status: "success",
        ticket,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
exports.getAdminChart = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    if (userId) {
      const tickets = await Ticket.find().count();
      const users = await User.findOne().count();
      const theatres = await Theatre.findOne().count();
      const movies = await Movie.findOne().count();
      const result = [
        { name: "Tickets", value: tickets },
        { name: "Users", value: users },
        { name: "Theatres", value: theatres },
        { name: "Movies", value: movies },
      ];
      console.log(result);
      res.json({
        status: "success",
        result,
      });
    }
  } catch (error) {
    res.json({
      status: "failed",
      error,
    });
    console.log(error);
  }
};
