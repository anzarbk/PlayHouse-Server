import mongoose from "mongoose";
const concertSchema = new mongoose.Schema({
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
    type: Array,
  },
  image: {
    type: Array,
  },
  banner: {
    type: Array,
  },

  address: {
    type: [
      {
        pincode: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        landmark: {
          type: String,
        },
        town: {
          type: String,
        },
        state: {
          type: String,
        },
      },
    ],
  },
});
module.exports = mongoose.model("concert", concertSchema);
