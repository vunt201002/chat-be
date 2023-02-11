const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 50
    },
    password: {
        type: String,
        min: 8,
        required: true
    },
    isAvatarImgSet: {
        type: Boolean,
        default: false
    },
    avatarImg: {
        type: String,
        default: ''
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("User", userSchema);