const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema ({
  styleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Style' ,
    required: true
  },
  curationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curation',
    default: null
  },
    content: {
    type: String,
    required: true,
    trim: true
  },
  nickname: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date
  }
});

module.exports = mongoose.model('Comment', CommentSchema);