const { checkIsAuth } = require("../controllers/authController");
const {
  editProfile,
  editProfileImage,
} = require("../controllers/profileController");
const {
  createTheatre,
  editTheatre,
  theatreEditImage,
  theatreGetData,
  getAlltheatre,
  createSeatCharter,
  getSeatChart,
  createShow,
  getShowData,
  getScreenData,
  createShowTime,
  getShowTime,
  deleteScreen,
  deleteShowTime,
  deleteShow,
  getSingleSeatChart,
  updateSeatCharter,
  getDbMovie,
  getSpecificTheatre,
  getSingleSeatChartByName,
  createTicket,
  getChartData,
  getShowDataById,
  deleteTicket,
  getTicketList,
  getTicket,
  getTicketTheatre,
} = require("../controllers/theatreController");
const {
  createMovie,
  editMovie,
  movieEditImage,
  movieGetData,
} = require("../controllers/movieController");
const router = require("express").Router();

router.patch("/profile", checkIsAuth, editProfile);
module.exports = router;
router.patch("/profile-image", checkIsAuth, editProfileImage);
module.exports = router;
//#################################
router.post("/theatre", checkIsAuth, createTheatre);
module.exports = router;
router.patch("/theatre", checkIsAuth, editTheatre);
module.exports = router;
router.patch("/theatre-image", checkIsAuth, theatreEditImage);
module.exports = router;
router.get("/theatre-data/:id", checkIsAuth, theatreGetData);
module.exports = router;
router.get("/theatre-data/:id", checkIsAuth, getAlltheatre);
module.exports = router;
router.post("/seat-charter", checkIsAuth, createSeatCharter);
module.exports = router;
router.patch("/seat-charter", checkIsAuth, updateSeatCharter);
module.exports = router;
router.get("/seat-data/:id", checkIsAuth, getSeatChart);
module.exports = router;
router.get("/get-single-seat/:id", checkIsAuth, getSingleSeatChart);
module.exports = router;
router.get("/seat-data-name/:id", getSingleSeatChartByName);
module.exports = router;
router.patch("/add-show-time", checkIsAuth, createShowTime);
module.exports = router;
router.get("/get-show-time", checkIsAuth, getShowTime);
module.exports = router;
router.delete("/delete-show-time/:id", checkIsAuth, deleteShowTime);
module.exports = router;

router.patch("/add-show", checkIsAuth, createShow);
module.exports = router;
router.get("/show-data", checkIsAuth, getShowData);
module.exports = router;
router.get("/show-data/:id", checkIsAuth, getShowDataById);
module.exports = router;
router.get("/db-movie", getDbMovie);
module.exports = router;
router.get("/spec-theatre/:id", checkIsAuth, getSpecificTheatre);
module.exports = router;
router.delete("/delete-show/:id", checkIsAuth, deleteShow);
module.exports = router;

router.get("/screen-data", checkIsAuth, getScreenData);
module.exports = router;
router.delete("/delete-seat-charter/:id", checkIsAuth, deleteScreen);
module.exports = router;
//#################################
router.post("/movie", checkIsAuth, createMovie);
module.exports = router;
router.patch("/movie", checkIsAuth, editMovie);
module.exports = router;
router.patch("/movie-image", checkIsAuth, movieEditImage);
module.exports = router;
router.get("/movie-data/:id", checkIsAuth, movieGetData);
module.exports = router;
//########################
router.patch("/ticket", checkIsAuth, createTicket);
module.exports = router;
router.get("/get-tickets", checkIsAuth, getTicketList);
module.exports = router;
router.get("/get-ticket", checkIsAuth, getTicket);
module.exports = router;
router.get("/get-tickets-theatre/:id", checkIsAuth, getTicketTheatre);
module.exports = router;
router.get("/chart-data", checkIsAuth, getChartData);
module.exports = router;
router.delete("/delete-ticket", checkIsAuth, deleteTicket);
module.exports = router;
