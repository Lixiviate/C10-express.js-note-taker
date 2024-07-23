const express = require("express");
const path = require("path");
const notes = require("./db/db");

const app = express();
const PORT = 3001;

// Middleware to serve static files from "Public" Directory
app.use(express.static("public"));
// Middleware for the parsing of JSON data
app.use(express.json());
// Middleware for parsing of URL encoded date
app.use(express.urlencoded({ extended: true }));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/api/notes", (req, res) => res.json(notes));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
