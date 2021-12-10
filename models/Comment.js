const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema({
  // The user is now part of the schema as each user has their own set of contacts.
  catalogID: {
    type: Number
  },
  libraryID: {
    type: Number
  },
  user_name: {
    type: String
  },
  user_comment: {
    type: String
  },
  date_posted: {
    type: Date
  },
});

module.exports = mongoose.model("post_comment", CommentSchema, "post_comment");
