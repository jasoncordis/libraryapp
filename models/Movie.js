const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
  director: {
    type: String
  }
});

module.exports = mongoose.model("is_a_movie", MovieSchema, "is_a_movie");
