var dotenv = require('dotenv').config();
var path = require('path');
var express = require('express');
var exphbs = require('express-handlebars');
var exphbsHelpers = require('./lib/helpers');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var flash = require('connect-flash');
var session = require('express-session');
var mongo = require('mongodb');
var mongoose = require('mongoose');

// database

mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
});

var db = mongoose.connection;


// Create a new Express application.
var app = express();

// express session

app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// connect flash

app.use(flash());

// global vars for flash

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.appInfo = {
      title: process.env.TITLE,
      titleLong: process.env.TITLE_LONG,
      footer: process.env.FOOTER
    };
  res.locals.globalUser = req.session.user;
  next();
});

// create routes
var index = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');


// setup passport

passport.use(new Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, callback) {
    return callback(null, profile);
  }));

passport.serializeUser(function(user, callback) {
  callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

// Configure view engine to render hbs templates.

app.set('views', path.join(__dirname, 'views'));

var exphbsHelpers = require('./lib/helpers');

app.engine('.hbs', exphbs(
        {
          extbane: '.hbs',
          defaultLayout:'defaultlayout.hbs',
          helpers: exphbsHelpers
        }
    ));

app.set('view engine', '.hbs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.

app.use(require('morgan')('tiny'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.use('/', index);
app.use('/users', users);
app.use('/auth', auth);

// public dir
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT, function() { console.log('\n\nServer for "' + process.env.TITLE + '" now listening on port ' + process.env.PORT + ' ...\n\n');} );
