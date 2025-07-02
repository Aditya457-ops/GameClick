const Post = require('../models/Post');

const likePostControl = async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await Post.find({ likes: userId })
      .populate('uploader', 'username') // Optional: if you want to show uploader's username
      .sort({ likes: -1 });

    res.json(posts);
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = likePostControl;
