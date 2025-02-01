const express = require("express");
const router = express.Router();
const content = require("../models/Content");
const user = require("../models/user");
const multer = require("multer");
const authenticateUser = require("../middleware/authenticateUser");
require("dotenv").config();

const { admin, bucket } = require("../firebase");

const upload = multer({
  storage: multer.memoryStorage(),
});

// To upload content (photo or video)

router.post(
  "/uploadContent",
  authenticateUser,
  upload.single("image"),
  async (req, res) => {
    try {
      let uploaded = false;

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

      const Content = new content({
        userId: req.userId,
        fileName: req.file.originalname,
        contentType: req.body.contentType,
        mediaType: req.file.mimetype,
        imageUrl: publicUrl,
      });

      blobStream.on("error", (error) => {
        res.status(500).send({ message: "Something went wrong!", error });
      });

      blobStream.on("finish", async () => {
        try {
          await Content.save();
          res
            .status(200)
            .send({ message: "File uploaded successfully", url: publicUrl });
        } catch (error) {
          res.status(500).json({ msg: "Failed to save content", error });
        }
      });

      // Upload the file
      blobStream.end(file.buffer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Failed to upload content" });
    }
  }
);

// To get content (photo or video)

router.get("/getcontent", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const contents = await content.find({ userId: userId });
    const images = contents.map((item) => ({
      ...item._doc,
    }));
    const postcount = await content.countDocuments({ userId: userId });
    res.send({ images, postcount });
  } catch (error) {
    res.json(error);
  }
});

router.get("/getcontent/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const User = await user
      .findOne({ username: username })
      .select("-password -email");
    const contents = await content.find({ userId: User._id });
    const images = contents.map((item) => ({
      imageUrl: item.imageUrl,
      mediaType: item.mediaType,
    }));
    const postcount = await content.countDocuments({ userId: User._id });
    res.send({ images, postcount, User });
  } catch (error) {
    res.json(error);
    console.log(error);
  }
});

router.put("/likecontent", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const contentId = req.body.contentId;
    const Contents = await content.findByIdAndUpdate(
      contentId,
      { $push: { likedAccount: userId } },
      { new: true, select: "likedAccount" },
    );
    res.send({content: Contents});
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/unlikecontent", authenticateUser, async (req, res) => {
  try {
    const userId = req.userId;
    const contentId = req.body.contentId;
    const Contents = await content.findByIdAndUpdate(
      contentId,
      { $pull: { likedAccount: userId } },
      { new: true, select: "likedAccount" },
    );
    res.send({content: Contents});
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
