const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
const upload = require('../utils/upload');

// GET /api/posts?page=1&limit=10&search=term&category=catId
router.get('/', postsController.getPosts);

// GET /api/posts/:id
router.get('/:id', postsController.getPostById);

// POST create (protected + file upload)
router.post('/', auth, upload.single('featuredImage'), [
  body('title').notEmpty().withMessage('Title required'),
  body('content').notEmpty().withMessage('Content required')
], postsController.createPost);

// PUT update
router.put('/:id', auth, upload.single('featuredImage'), postsController.updatePost);

// DELETE
router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
