var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

// Define routes.

router.get('/',
  function(req, res) {

    res.render('home', { user: req.user });
  });


module.exports = router;
