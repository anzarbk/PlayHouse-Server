const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema(
  {
    orderID: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    movieName: {
      type: String,
    },
    movieDate: {
      type: Date,
    },
    movieTheatre: {
      type: String,
      required: true,
    },
    movieScreen: {
      type: String,
    },
    movieShowTime: {
      type: String,
    },
    movieShowId: {
      type: mongoose.Types.ObjectId,
      ref: "show",
    },
    paymentMethod: {
      type: String,
    },
    newAmount: {
      type: Number,
    },
    seatNameArray: {
      type: Array,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Ticket", ticketSchema);
