const express = require('express')
const blogControllers = require('../controllers/blog')
const {verify} = require('../auth')

const router = express.Router()

router.post('/posts', verify, blogControllers.createPost)

router.get('/allPosts', blogControllers.getAllPosts)

// router.get('/myPosts', verify, blogControllers.getMyPosts)

router.get('/post/:postId', blogControllers.getSpecificPost)

router.patch('/updatePost/:postId', verify, blogControllers.updatePost)

router.delete('/deletePost/:postId', verify, blogControllers.deletePost)

module.exports = router;