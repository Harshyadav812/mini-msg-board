const express = require('express');
const app = express();
const path = require('node:path');
const { indexRouter } = require('./routes/indexRouter');
const formRouter = require('./routes/formRouter');
const msgRouter = require('./routes/msgRouter');

const PORT = process.env.PORT || 3000;


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use('/new', formRouter);
app.use('/message', msgRouter);
app.use('/', indexRouter);
