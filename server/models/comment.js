const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  auther: {
    type: Schema.ObjectId,
    required: [true,'auther id is reqired']
  },
  auther_name: {
    type: String,
    required: [true,'auther name is required']
  },
  text:{
    type: String,
    required : [true,'Empty text not allowed']
  },
  reply:{
    type: [this],
    default: []
  },
  level:{
    type: Number,
    default: 0
  }
});

const Comment= mongoose.model('comment',CommentSchema);
module.exports = Comment;
