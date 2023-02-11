const User = require("../models/User");
const bcrypt = require("bcrypt");

const userController = {
    // register
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const usernameCheck = await User.findOne({ username });
            const emailCheck = await User.findOne({ email });

            if (usernameCheck) {
                return res.status(401).json("Username already used");
            }
            if (emailCheck) {
                return res.status(409).json("Email already used");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({
                email,
                username,
                password: hashedPassword
            });
            
            delete user.password;
            return res.status(200).json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    
    // login
    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json("Incorrect Username or Password");
            }
            
            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            if (!isValidPassword) {
                return res.status(404).json("Incorrect Username or Password");
            }

            delete user.password;

            return res.status(200).json(user);
        } catch (err) { 
            return res.status(500).json(err);
        }
    },

    // set avatar
    setAvatar: async (req, res) => {
        try {
            const userId = req.params.id;
            const avatarImage = req.body.image;
            const userData = await User.findByIdAndUpdate(userId, {
                isAvatarImgSet: true,
                avatarImg: avatarImage
            });

            return res.status(200).json({
                isSet: userData.isAvatarImgSet,
                image: userData.avatarImg
            });
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    // all users
    getAllUser: async (req, res) => {
        try {
            const users = await User.find({ _id: { $ne: req.params.id } }).select([
                "email",
                "username",
                "avatarImg",
                "_id",
            ]);
            return res.status(200).json(users);
          } catch (ex) {
            return res.status(500).json(err);
          }
    },
};

module.exports = userController;