var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');



router.put('/', require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    console.log(' in PUT users');
    // res.render('profile', { user: req.user });
});


router.get('/profile', require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
});


module.exports = router;
