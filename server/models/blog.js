const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubContent = new Schema({
  text: {
    type: String,
    required: [true,'content text is required']
  },
  index:{
    type: Number,
    required: [true,'content index is required']
  },
  type:{
    type: String,
    required: [true,'content type is required']
  }
});


const BlogSchema = new Schema({
  auther: {
    type: Schema.ObjectId,
    required: [true,'auther is required']
  },
  title:{
    type: String,
    required: [true,'title is required']
  },
  featured_image:{
    type: String,
    required: [true,'featured_image is required'] 
  },
  content:{
    type: [SubContent],
    required: [true,'content is required']
  },
  liked_by:{
    type: [Schema.ObjectId],
    default: []
  },
  comments:{
    type: [Schema.ObjectId],
    default: []
  }
});

  
const Blog = mongoose.model('blog',BlogSchema);
module.exports = Blog;