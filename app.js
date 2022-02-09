/* Node Imports */
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');

/* Framework Imports */
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
var mongoose = require("mongoose");
var cors = require('cors');

/* Local Imports */
var { mongodb_url } = require("./database_layer/database_config");
var common_utils = require("./utils/common_utils");
const response_codes = require('./utils/response_codes');

var app = express();

var User = require('./model/user_model');

mongoose.connect(mongodb_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(`Connected to ${mongodb_url.split("@")[1]}`);
});
mongoose.connection.on("reconnected", () => {
  console.log(`Reconnected to ${mongodb_url.split("@")[1]}`);
});
mongoose.connection.on("error", (error) => {
  console.log(`Error occured while connecting to ${mongodb_url.split("@")[1]}`, error);
  mongoose.disconnect();
});
mongoose.connection.on("disconnected", () => {
  console.log(`Disconnected from ${mongodb_url.split("@")[1]}`);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Session
app.use(session({ 
                  name:'session-id', 
                  secret: process.env.SESSION_SECRET, 
                  resave: true, 
                  saveUninitialized: true
                })
);

BASE_URL = "/api/v1";
app.use(BASE_URL + '/', require('./routes/index'));
app.use(BASE_URL + '/users', require('./routes/users'));
app.use(BASE_URL + '/our-teams', require('./routes/our_teams'));
app.use(BASE_URL + '/projects', require('./routes/project'));
app.use(BASE_URL + '/certificates', require('./routes/certificate'));
app.use(BASE_URL + '/firebase', require('./routes/firebase'));
app.use(BASE_URL + "/contact-us", require('./routes/contact_us'));


// 400 error handler
app.use(function (err, req, res, next) {
  if (err.status === 400) {
    return res.status(response_codes.CODE_BAD_REQUEST).send(common_utils.response_generator(
                      response_codes.CODE_BAD_REQUEST, 
                      response_codes.MESSAGE_RESPONSE_BAD_REQUEST + ` ${err.message}`));
  }
  next(err);
});

// multer error handler
app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(response_codes.CODE_BAD_REQUEST).send(common_utils.response_generator(
                      response_codes.CODE_BAD_REQUEST, 
                      response_codes.MESSAGE_RESPONSE_BAD_REQUEST + ` ${err.code}`));
  }
  next(err);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(response_codes.CODE_NOT_FOUND).send(common_utils.response_generator(
    response_codes.CODE_NOT_FOUND, 
    response_codes.MESSAGE_NOT_FOUND));
  next(createError(response_codes.CODE_NOT_FOUND));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  console.error(err);
  res.status(response_codes.CODE_INTERNAL_SERVER_ERROR).send(common_utils.response_generator(
    response_codes.CODE_INTERNAL_SERVER_ERROR, 
    response_codes.MESSAGE_RESPONSE_INTERNAL_SERVER_ERROR));
});

module.exports = app;
