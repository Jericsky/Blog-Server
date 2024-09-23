const Comment = require('../models/Comment')

module.exports.addComment = async (req, res) => {
    try {
        const {id} = req.user
        const {comment} = req.body

        const newComment = new Comment({
            userId: id,
            comment
        })

        const result = await newComment.save()

        res.send(result)
        
    } catch (error) {
        console.log('Error in adding comment: ', error)
        return res.status(500).send({error: 'Internal server error: Failed to add comment'})
    }
}

module.exports.getComment = async (req, res) => {
    try {
        const {postId} = req.params
        if(!postId){
            return res.status(404).send({error: 'No blog post found'})
        }

        const result = await Comment.findById(postId)
        console.lof(result)
        if(result){
            return res.status(500).send(result)
        }
        
    } catch (error) {
        
    }
}