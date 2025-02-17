const db = require("../db/queries");

async function getAllMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", {
    title: "Messages",
    messages
  })
};

async function getMessageById(req, res) {
  const id = req.params.id;
  const msg = await db.getMessageById(id);
  res.render("searchedMsg", {
    title: 'Message',
    msg
  })
}

async function insertMessageGet(req, res) {
  res.render("form")
}

async function insertMessagePost(req, res) {
  const { username, message } = req.body;
  await db.insertMessage(username, message);
  res.redirect('/')
}

async function updateMessageGet(req, res) {
  const id = req.params.id;
  res.render("updateForm", {
    id
  })
}

async function updateMessagePost(req, res) {
  const id = req.params.id;
  console.log(id)
  const newMsg = req.body.message;
  console.log(newMsg);
  await db.updateMessage(id, newMsg);
  res.redirect('/')
}

async function deleteMessage(req, res) {
  const id = req.params.id;
  await db.deleteMessage(id);
  res.redirect("/")
}

module.exports = {
  getAllMessages,
  getMessageById,
  insertMessageGet,
  insertMessagePost,
  updateMessageGet,
  updateMessagePost,
  deleteMessage
}