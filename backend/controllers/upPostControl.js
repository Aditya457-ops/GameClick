const Post = require('../models/Post');
const User = require('../models/User');

const upPostControl = async (req, res) => {

    const userId = req.user.id;
    const { caption } = req.body;
    const { title } = req.body;

    const imageURL = req.file ? req.file.path : null;

    try {
        const newPost = new Post({image: imageURL, uploader: userId, caption, title});
        await newPost.save();
        await User.findByIdAndUpdate(userId, { $push: { uploadedpost: newPost._id } });

        res.json({
            message: "uploaded successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: `error: ${error}`
        });
    }

}

module.exports = upPostControl;