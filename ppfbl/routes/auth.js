var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

router.get('/',
  function(req, res){
    res.render('login');
});

router.get('/facebook',
  passport.authenticate('facebook'), function() {
    console.log('here1');
  });



router.get('/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('successful facebook login');
    console.log(req.user);
    User.count({ strategy: 'facebook', facebookID: +req.user.id }, function (err, count) {
      if (err) throw err;
      console.log("count = " + count);
      console.log("id = " + req.user.id);
      if (count) {
        console.log("You've logged in before ...");
      } else {
        console.log('You\'ve never logged in before ...');
        var newUser = new User({
          strategy: 'facebook',
          username: '',
          password: '',
          name: req.user.displayName,
          facebookID: +req.user.id
        });
        User.facebookCreateUser(newUser, function(err, user) {
          console.log('Callback of User.createUser');
        });

      }


      res.redirect('/');
    });
  });

//****************************************************





//****************************************************

module.exports = router;
