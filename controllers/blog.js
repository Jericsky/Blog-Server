const Blogs = require('../models/Blog')

module.exports.createPost = async (req, res) => {
    try {
        const {id} = req.user

        const {title, content, category, tags} = req.body;
        if(!title || !content || !category){
            return res.status(400).send({error: 'Title, Content and Category is required'})
        }

        if(title.length < 5){
            return res.status(400).send({error: 'Title must be atleast 5 characters'})
        }

        if(content.length < 15){
            return res.status(400).send({error: 'Contence must be atleast 15 characters long'})
        }

        const newPost = new Blogs({
            title,
            content,
            authorId: id,
            category,
            tags
        })

        const post = await newPost.save()
        if(post){
            return res.status(201).send({
                message: 'Post successfully created',
                newPost
            })
        } else {
            return res.status(400).send({error: 'Something went wrong'})
        }
        
    } catch (error) {
        console.log('Error in creating post: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to create post'})
    }
}

module.exports.getAllPosts = async (req, res) => {
    try {

        const allPosts = await Blogs.find({})
        res.status(200).send(allPosts)
        
    } catch (error) {
        console.log('Error in getting all post: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to get all posts'})
    }
}

module.exports.getSpecificPost = async (req, res) => {
    try {
        const {postId} = req.params
        if(!postId){
            return res.status(404).send({error: 'No Blog post found'})
        }

        const result = await Blogs.findById(postId)
        if(result){
            return res.status(200).send(result)
        }
        
    } catch (error) {
        console.log('Error in getting specific post: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to get specific post'})
    }
}

module.exports.updatePost = async (req, res) => {
    try {
        const {postId} = req.params
        const {title, content, category, tags} = req.body

        const existingPost = await Blogs.findById(postId)
        if(!existingPost){
            return res.status(404).send({error: 'Post not found'})
        }

        const updatedPost = {
            title,
            content,
            category,
            tags
        }

        const result = await Blogs.findByIdAndUpdate(postId, updatedPost, {new: true})
        if(result){
            return res.status(200).send(result)
        } else{
            return res.status(400).send({error: 'Failed to update post'})
        }
        
    } catch (error) {
        console.log('Error in ')
    }
}

module.exports.deletePost = async (req, res) => {
    try {
        const {postId} = req.params

        const result = await Blogs.findByIdAndDelete(postId)
        if(!result){
            return res.status(404).send({error: 'Post not found'})
        }

        res.status(200).send({message: 'Deleted successfully'})
        
    } catch (error) {
        console.log()
    }
}