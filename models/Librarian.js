const mongoose = require("mongoose");

const LibrarianSchema = mongoose.Schema({
  user_name: {
    type: String,
    required: true,
  },
  librarianID: {
    type: Number,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("librarians", LibrarianSchema, "librarians");
