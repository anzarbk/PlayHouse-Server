const mongoose = require("mongoose");
const showSchema = new mongoose.Schema(
  {
    theatre: {
      type: mongoose.Types.ObjectId,
      ref: "theatre",
      unique: false,
    },
    movie: {
      type: Object,
      unique: false,
    },
    Date: {
      type: Date,
      unique: false,
    },
    show: {
      type: String,
      unique: false,
    },
    price: {
      type: Number,
      unique: false,
    },
    screen: {
      type: Object,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("show", showSchema);
