import express from 'express';
import { getPosts, getPost, getPostBySearch ,createPost, updatePost, deletePost, likePost, comment } from '../controllers/posts.js';
import auth from '../middleware/auths.js';

const router = express.Router();

router.get('/search', getPostBySearch);
router.get('/:id', getPost );
router.get('/', getPosts );
router.delete('/:id', auth, deletePost);
router.post('/', auth, createPost );
router.post('/:id/comment', auth, comment );
router.patch('/:id', auth, updatePost );
router.patch('/:id/likePost', auth, likePost)

export default router;