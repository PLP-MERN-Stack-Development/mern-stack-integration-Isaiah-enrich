const Post = require('../models/Post');
const { validationResult } = require('express-validator');

exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip = (page - 1) * limit;
    const search = req.query.search ? { $text: { $search: req.query.search } } : {};
    const category = req.query.category ? { categories: req.query.category } : {};
    const filter = { ...search, ...category };

    const [posts, total] = await Promise.all([
      Post.find(filter).populate('author', 'name').populate('categories').sort({ createdAt: -1 }).skip(skip).limit(limit),
      Post.countDocuments(filter)
    ]);

    res.json({ data: posts, meta: { page, limit, total, pages: Math.ceil(total/limit) } });
  } catch (err) { next(err); }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email').populate('categories');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const postData = {
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      author: req.user.id,
      categories: req.body.categories ? req.body.categories.split(',') : []
    };
    if (req.file) {
      postData.featuredImage = `/uploads/${req.file.filename}`;
    }
    const post = await Post.create(postData);
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    // authorization: only author can update (simple)
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    post.title = req.body.title ?? post.title;
    post.excerpt = req.body.excerpt ?? post.excerpt;
    post.content = req.body.content ?? post.content;
    if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;
    post.updatedAt = new Date();
    await post.save();
    res.json(post);
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Not found' });
    if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await post.deleteOne();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
