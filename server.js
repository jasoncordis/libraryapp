// Bring in modules.
const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

// Database connection.
connectDB();

// Express middleware.
app.use(express.json({ extended: false }));

// Define routes.
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/librarianauth", require("./routes/librarianauth"));
app.use("/api/librarians", require("./routes/librarians"));
app.use("/api/contacts", require("./routes/contacts"));
app.use("/api/contacts/test", require("./routes/contacts"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/comments/viewer", require("./routes/comments"));
app.use("/api/getusers", require("./routes/getUsers"));
app.use("/api/movies", require("./routes/movies"));
app.use("/api/movies/viewer", require("./routes/movies"));
app.use("/api/contacts/viewer", require("./routes/contacts"));
app.use("/api/books", require("./routes/books"));
app.use("/api/books/viewer", require("./routes/books"));
app.use("/api/loanrecord", require("./routes/loanrecord"));
app.use("/api/loanrecord/viewer", require("./routes/loanrecord"));
app.use("/api/loanrecord/return", require("./routes/loanrecord"));
app.use("/api/rating/", require("./routes/ratings"));
app.use("/api/rating/viewer", require("./routes/ratings"));


// Serve static assets in production.
if (process.env.NODE_ENV === "production") {
  // Sets static folder.
  app.use(express.static("client/build"));
  
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

  app.get('/viewer/:id', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

// Server port for the backend.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
