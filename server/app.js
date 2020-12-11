require('dotenv').config();

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('./configs/db.config');

require('./configs/passport.config');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.locals.title = 'Express - Generated with IronGenerator';

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/index'));
app.use('/api', require('./routes/post.routes'));
app.use('/api', require('./routes/auth.routes'));
app.use('/api', require('./routes/fileUpload.routes'));
app.use('/api', require('./routes/profile.routes'));

//Setting up environments
if (process.env.NODE_ENV === "production") {
  // set ability to get static values from client build folder
  // static files include all javascript and css files
  app.use(express.static("client/build"));

  // get the index.html that will be rendered on the browser
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "../client", "build", "index.html"));
  });
}

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
