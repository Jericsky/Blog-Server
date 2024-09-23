const express = require('express')
const commentControllers = require('../controllers/comment')
const {verify} = require('../auth')

const router = express.Router();

router.post('/post/:postId', verify, commentControllers.addComment)

router.get('/post/:postId', verify, commentControllers.getComment)







module.exports = router;