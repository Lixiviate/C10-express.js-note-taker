const noteId = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const notes = [
  {
    title: "Test Title",
    text: "Test text",
    note_id: noteId(),
  },
];

module.exports = notes;
