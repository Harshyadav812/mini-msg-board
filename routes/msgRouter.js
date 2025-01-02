const { Router } = require('express');
const msgRouter = Router();
const { getMsgById } = require('./indexRouter');

msgRouter.get('/', (req, res) => {
  res.send('All messages')
})

msgRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const msg = await getMsgById(Number(id))

  res.render('msg', { msg });
})

module.exports = msgRouter;