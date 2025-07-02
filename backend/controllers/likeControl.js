const Post = require('../models/Post');
const User = require('../models/User');

const likeControl = async (req, res) => {

    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    const hasLiked = post.likes.includes(userId);

    try {

        if(hasLiked) {
            await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
            await User.findByIdAndUpdate(userId, { $pull: { likedpost: postId } })
        } else {
            await Post.findByIdAndUpdate(postId, { $addToSet: { likes: userId } });
            await User.findByIdAndUpdate(userId, { $addToSet: { likedpost: postId } })
        }

        res.json({
            message: "liked successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        });
    }

}

module.exports = likeControl;