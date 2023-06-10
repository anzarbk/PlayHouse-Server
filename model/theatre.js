const mongoose = require("mongoose");
const theatreSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  facilities: {
    type: String,
  },
  about: {
    type: String,
  },
  screen: {
    type: mongoose.Types.ObjectId,
    ref: "seatCharter",
  },
  image: {
    type: String,
  },
  banner: {
    type: String,
  },
  pincode: {
    type: String,
  },
  seatCharter: {
    type: Array,
  },
  address: {
    type: String,
  },
  town: {
    type: String,
  },
  state: {
    type: String,
  },
  isBlocked: {
    type: Boolean,
    default: true,
  },
  role: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("theatre", theatreSchema);
