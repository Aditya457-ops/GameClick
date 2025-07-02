const {Schema, model} = require("mongoose");

const PostSchema = new Schema({
    likes: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    image: {
        type: String,
        required: true
    },
    caption: {
        type: String
    },
    uploader: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true
    }
})

const PostModel = model("Post", PostSchema);
module.exports = PostModel;