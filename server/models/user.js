var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Our UserSchema for User.
// set up a mongoose model and pass it using module.exports
const UserSchema= new Schema({
    username:{
      type: String,
      required : [true,'first name is required']
    },
    email:{
      type:String,
      required : [true,'email is required']
    },
    googleId:{
      type: String,
      required : [true,'googleId is required']
    },
    thumbnail:{
      type: String
    },
    blogs:{
      type: [Schema.ObjectId],
      default: []
    }
});

const User= mongoose.model('user', UserSchema);

module.exports = User;