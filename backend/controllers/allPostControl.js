const Post = require('../models/Post');


const allPostControl = async (req, res) => {

    try {
        const posts = await Post.find().populate('uploader', 'username').sort({likes: -1});
        res.json(posts)
    } catch (error) {
        res.status(500).json({message: "interval server error"});
    }

}

module.exports = allPostControl;