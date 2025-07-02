const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        maxLength: 10,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true
    },
    uploadedpost: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    likedpost: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
})

const UserModel = model("User", UserSchema);
module.exports = UserModel;