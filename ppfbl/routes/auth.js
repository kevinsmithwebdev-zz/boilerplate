var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

router.get('/login',
  function(req, res){
    res.render('login');
});

router.get('/logout',
  function(req, res){
    req.logout();
    req.session.user = {};
    res.redirect('/');
});




router.get('/facebook',
  passport.authenticate('facebook'), function() {
  });



router.get('/facebook/return', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    var userObj = {};
    User.find({ strategy: 'facebook', facebookID: +req.user.id }, function (err, userObj) {
      if (err) throw err;

      if (userObj.length) {
        userObj = userObj[0];
      } else {
        userObj = {
          strategy: 'facebook',
          name: req.user.displayName,
          facebookID: +req.user.id
        };
        var newUser = new User(userObj);

        User.facebookCreateUser(newUser, function(err, user) {

        });

      } // if (userObj.length) -> else

      req.session.user = userObj;;

      res.redirect('/');
    }); // User.find
  });

//****************************************************





//****************************************************

module.exports = router;
