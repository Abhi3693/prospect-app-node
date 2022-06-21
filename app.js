const express = require('express');
const createError = require('http-errors');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

const errorController = require('./controller/errorController');
const prospectRouter = require('./routes/prospect');

// Connect to database

mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_CONNECTION)
  .then((res) => console.log('Connected to DB!'))
  .catch((err) => console.log(err));

// Instantiate app
const app = express();

// middlewares
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/prospect', prospectRouter);
app.use(errorController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// listening to port
app.listen(process.env.PORT || 4000);
