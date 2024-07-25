const id = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const notes = [
  {
    title: "Research API",
    text: "Investigate potential server-side APIs for new website project.",
    id: id(),
  },
  {
    title: "Website Project",
    text: "Collaborating with team members to finalize the design.",
    id: id(),
  },
  {
    title: "Update Documentation",
    text: "Revise readme documentation.",
    id: id(),
  },
];

module.exports = { notes, id };
