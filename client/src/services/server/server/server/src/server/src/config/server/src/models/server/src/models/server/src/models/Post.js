const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String, required: true },
  featuredImage: { type: String }, // URL or path to /uploads
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
});
module.exports = mongoose.model('Post', PostSchema);
