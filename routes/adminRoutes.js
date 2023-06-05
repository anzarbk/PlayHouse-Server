const {
  getUserData,
  getUserOnlyData,
} = require("../controllers/profileController");
const {
  getAlltheatre,
  getTheatreOnlyData,
  getAdminChart,
  getAdminTickets,
} = require("../controllers/theatreController");

const router = require("express").Router();

//  domain/admin/user-data

router.get("/user-data", getUserData);
module.exports = router;
router.get("/user-only-data/:id", getUserOnlyData);
module.exports = router;
router.get("/theatre-data", getAlltheatre);
module.exports = router;
router.get("/theatre-only-data/:id", getTheatreOnlyData);
module.exports = router;
router.get("/get-admin-chart", getAdminChart);
module.exports = router;
router.get("/get-admin-tickets", getAdminTickets);
module.exports = router;
