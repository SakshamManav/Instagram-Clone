const express = require("express");
const router = express.Router();
const user = require("../models/user");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const jwtSecret = "it is a secret";
const message = require("../models/Websocketmodel")
const authenticateUser = require("../middleware/authenticateUser");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { admin, bucket } = require("../firebase");
const content = require("../models/Content");

const upload = multer({
  storage: multer.memoryStorage(),
});

//    To create a new user or (signup)
router.post(
  "/signup",
  [
    body("username", "Username should be of atleast 5 characters").isLength({
      min: 5,
    }),
    body("email", "Not a valid email").isEmail(),
    body("password", "Password should be of atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    const result = await validationResult(req);
    if (result.errors.length !== 0) {
      res.status(500).json({ msg: result.errors });
    } else {
      try {
        // Password hashing
        var salt = await bcrypt.genSalt(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        // storing user data to database when username,email,password condition meets
        const User = await new user({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        const usernameCheck = await user.find({ username: req.body.username });

        if (usernameCheck.length > 0) {
          res.status(500).send({
            msg: [{ msg: "Username is already taken, Choose another one !!" }],
          });
        } else {
          await User.save();
          const payload = {
            User: {
              id: User.id,
            },
          };
          const authToken = jwt.sign(payload, jwtSecret);
          res.json({ authToken: authToken });
          console.log("saved successfully");
        }
      } catch (error) {
        res.status(400).json({ msg: "Email is already used!" });
      }
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email", "Not a valid email").isEmail(),
    body("password", "Password should be of atleast 8 characters").exists(),
  ],
  async (req, res) => {
    let result = validationResult(req);
    if (result.errors.length !== 0) {
      res.status(404).json({ msg: "Invalid Credentials" });
    } else {
      try {
        const { email, password } = req.body;
        const User = await user.findOne({ email });
        // checking if user exists with this email
        if (!User) {
          return res.status(404).json({ msg: "Invalid Credentials" });
        }
        // checking if given password matched with user password store in database liked with this email

        const passwordCompare = await bcrypt.compare(password, User.password);
        if (!passwordCompare) {
          return res.status(404).json({ msg: "Invalid Credentials" });
        }
        const payload = {
          User: {
            id: User.id,
          },
        };

        const authToken = jwt.sign(payload, jwtSecret);
        res.json({ authToken: authToken });
      } catch (error) {
        res.status(404).send({ msg: error });
      }
    }
  }
);

//   To get the user
router.get("/userinfo", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const User = await user.findById(userId).select("-password");
    res.json({ User });
  } catch (error) {
    res.send("not a user");
  }
});

// Update user info
router.put(
  "/updateuserimg",
  authenticateUser,
  upload.single("image"),
  async (req, res) => {
    try {
      const userId = req.userId;
      const file = req.file;
      const fileName = `${Date.now()}_${file.originalname}`;

      const blob = bucket.file(fileName);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
        bucket.name
      }/o/${encodeURIComponent(blob.name)}?alt=media&`;
      const User = await user.findOneAndUpdate(
        { _id: userId },
        { profileimageUrl: publicUrl }
      );

      blobStream.on("error", (error) => {
        res.status(500).send({ message: "Something went wrong!", error });
      });

      blobStream.on("finish", async () => {
        try {
          res.status(200).send({
            message: "Profile photo uploaded successfully",
            url: publicUrl,
          });
        } catch (error) {
          res.status(500).json({ msg: "Failed to save content", error });
        }
      });

      blobStream.end(file.buffer);
    } catch (error) {
      res.json(error);
      // console.log(error);
    }
  }
);

// search other user
router.get("/searchusers", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const Users = await user
      .find({ _id: { $ne: userId } }, "-password");
    res.send(Users);
  } catch (error) {
    res.json(error);
  }
});

// Handle followers and following

router.put("/follow", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const followingId = req.body.followingId;

    const curUser = await user.findByIdAndUpdate(
      userId,
      { $push: { following: followingId } },
      { new: true, select: "following followers" }
    );

    const followingUser = await user.findByIdAndUpdate(
      followingId,
      { $push: { followers: userId } },
      { new: true, select: "follwing followers" }
    );
    res.json({ currentUser: curUser, followingUsers: followingUser });
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(error);
  }
});

router.put("/unfollow", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const followingId = req.body.followingId;

    const curUser = await user.findByIdAndUpdate(
      userId,
      { $pull: { following: followingId } },
      { new: true, select: "following followers" }
    );

    const followingUser = await user.findByIdAndUpdate(
      followingId,
      { $pull: { followers: userId } },
      { new: true, select: "following followers" }
    );
    res.json({ currentUser: curUser, followingUsers: followingUser });
  } catch (error) {
    res.status(500).json({ err: error });
    console.log(error);
  }
});

// Search users with id(for finding info of following or followers)

router.get("/searchuserbyid/:userid", async (req, res) => {
  try {
    const userId = req.params.userid;
    const User = await user.findById(userId).select("-password -email");
    const contents = await content.find({userId:userId});

    res.json({ user : User, images:contents });
  } catch (error) {
    res.status(400).json(error);
  }
});


// Getting the messages of users 

router.get("/userschats/:recieverId",authenticateUser, async (req,res)=>{
  try {
    const senderId = req.userId;
    const recieverId = req.params.recieverId;
    const Messages = await message.find({
      $or: [
        { senderId: senderId, recieverId: recieverId },
        { senderId: recieverId, recieverId: senderId }
      ]
    }).sort({ timestamp: 1 });
    
    res.json({msg : Messages});
  } catch (error) {
    res.status(400).json(error);
  }
})

module.exports = router;
