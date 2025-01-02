const { Router } = require("express");
const indexRouter = Router();
const { v4: uuidv4 } = require('uuid');

let msgId = 0;
const messages = [
  {
    id: msgId++,
    text: "Hi there!",
    user: "Amando",
    added: new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    })
  },
  {
    id: msgId++,
    text: "Hello World!",
    user: "Charles",
    added: new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    })
  }
];

async function getMsgById(id) {
  return messages.find(msg => msg.id === id);

}

indexRouter.get('/', (req, res) => {
  res.render('index', { title: "Mini Message Board", messages: messages })
})

indexRouter.post('/new', (req, res) => {
  const userName = req.body.authorName;
  const msgText = req.body.msgText;
  messages.push({
    id: msgId++,
    text: msgText,
    user: userName,
    added: new Date().toLocaleString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'Asia/Kolkata'
    }),
  })

  res.redirect('/')
});


module.exports = {
  indexRouter,
  getMsgById
};