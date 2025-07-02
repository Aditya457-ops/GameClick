const Post = require('../models/Post');
const User = require('../models/User');

const deleteControl = async (req, res) => {

    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    try {

        await User.findByIdAndUpdate(userId, {$pull: {uploadedpost: postId}})
        await Post.findByIdAndDelete(postId);


        res.json({
            message: "deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `Error: ${error}`
        });
    }

}

module.exports = deleteControl;