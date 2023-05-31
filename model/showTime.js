const mongoose = require("mongoose");
const showTimeSchema = new mongoose.Schema({
  theatre: {
    type: mongoose.Types.ObjectId,
    ref: "theatre",
    unique: false,
  },
  showName: {
    type: String,
    unique: false,
  },
  startTime: {
    type: String,
    unique: false,
  },
  endTime: {
    type: String,
    unique: false,
  },
});
module.exports = mongoose.model("showTime", showTimeSchema);
