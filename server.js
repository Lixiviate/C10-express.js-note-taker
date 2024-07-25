const express = require("express");
const path = require("path");
const fs = require("fs");
const { id } = require("./db/db.js");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to serve static files from "Public" Directory
app.use(express.static("public"));
// Middleware for the parsing of JSON data
app.use(express.json());
// Middleware for parsing of URL encoded data
app.use(express.urlencoded({ extended: true }));

// Utility to read notes from db.json
const readNotes = () => {
  const data = fs.readFileSync(path.join(__dirname, "db", "db.json"));
  return JSON.parse(data);
};

// Utility to write notes to db.json
const writeNotes = (notes) => {
  fs.writeFileSync(
    path.join(__dirname, "db", "db.json"),
    JSON.stringify(notes, null, 2)
  );
};

// Route to serve notes.html file
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// Route to serve index.html file when root endpoint is accessed
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// GET request for all notes
app.get("/api/notes", (req, res) => {
  console.info(`${req.method} request received to get notes`);
  const notes = readNotes();
  return res.status(200).json(notes);
});

// GET request for a single note
app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const notes = readNotes();

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

// POST request to add a note
app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  const notes = readNotes();

  if (req.body?.title && req.body?.text) {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: id(),
    };

    notes.push(newNote);
    writeNotes(notes);

    return res.status(201).json({
      status: "success",
      data: newNote,
    });
  } else {
    return res
      .status(400)
      .json("Request body must at least contain a title and text");
  }
});

// DELETE request to delete a note
app.delete("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  let notes = readNotes();
  const noteIndex = notes.findIndex((note) => note.id == id);

  if (noteIndex === -1) {
    return res.status(404).json("Note not found!");
  }

  notes.splice(noteIndex, 1);
  writeNotes(notes);

  return res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
  });
});

// Route to serve index.html file when wildcard endpoint is accessed
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
