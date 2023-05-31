const mongoose = require("mongoose");
const movieSchema = new mongoose.Schema({
  backdrop_path: {
    type: String,
  },
  genre: {
    type: Array,
  },
  movieId: {
    type: Number,
  },
  original_language: {
    type: String,
  },
  original_title: {
    type: String,
  },
  overview: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  title: {
    type: String,
  },
});
module.exports = mongoose.model("movie", movieSchema);
