var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

// Define routes.

router.get('/',
  function(req, res) {
    if (res.locals.globalUser && res.locals.globalUser.name)
      res.render('home', { user: req.user });
    else
      res.redirect('/auth/login');
  });


module.exports = router;
