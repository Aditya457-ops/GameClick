const Post = require('../models/Post');

const userPostControl = async (req, res) => {

    const userId = req.user.id;

    try {
        const posts = await Post.find({ uploader: userId }).sort({likes: -1});
        res.json(posts)
    } catch (error) {
        res.status(500).json({message: "interval server error"});
    }
}

module.exports = userPostControl;