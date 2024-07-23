const express = require("express");
const path = require("path");
const { notes, id } = require("./db/db");

const app = express();
const PORT = 3001;

// Middleware to serve static files from "Public" Directory
app.use(express.static("public"));
// Middleware for the parsing of JSON data
app.use(express.json());
// Middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));

// Route to serve notes.html file
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

// Route to serve index.html file when root endpoint is accessed
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

// GET request for all notes
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received to get notes`);
  return res.status(200).json(notes);
});

// GET request for a single note
app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send("Note ID not found!");
  }

  console.info(`${req.method} request received to get a single note`);

  const note = notes.find((note) => note.id == id);

  if (!note) {
    return res.status(404).json("Note not found!");
  }

  res.status(200).json(note);
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
