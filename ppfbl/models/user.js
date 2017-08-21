var mongoose = require("mongoose");
// var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = mongoose.Schema({
      strategy:       { type: String },
      name:           { type: String },

      localUsername:  { type: String },
      localPassword:  { type: String },
      localEmail:     { type: String },

      facebookID:     { type: Number }
});

UserSchema.plugin(passportLocalMongoose);

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.facebookCreateUser = function(newUser, callback) {
  // console.log('In User.facebookCreateUser ...');
  // console.log(newUser);
  newUser.save(callback);
}

module.exports.facebookCheckUserExists = function(newUser, callback) {
  // console.log('In User.facebookCreateUser ...');
  // console.log(newUser);
  newUser.save(callback);
}



//
// module.exports.changePassword = function(data, callback) {
//
//   bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash(data.newPassword, salt, function(err, hash) {
//       var query = { username: data.username };
//       User.findOneAndUpdate(query, { password: hash }, {new: true}, callback);
//     });
//   });
// }
//
// module.exports.getUserByUsername = function(username, callback) {
//   var query = {username: username};
//   User.findOne(query, callback);
// }
//
// module.exports.getUserById = function(id, callback) {
//   User.findById(id, callback);
// }
//
// module.exports.comparePassword = function(candidatePassword, hash, callback) {
//   if (!hash)
//     hash = "";
//   bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     if (err) throw err;
//     callback(null, isMatch);
//   });
// }
