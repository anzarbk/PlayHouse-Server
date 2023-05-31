const mongoose = require("mongoose");
const seatCharterSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Types.ObjectId,
    ref: "theatre",
  },
  seatCharter: {
    type: Array,
  },
  screenName: {
    type: String,
  },
});
module.exports = mongoose.model("seatCharter", seatCharterSchema);
