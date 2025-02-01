const mongoose = require("mongoose");
const conentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  contentType: {
    type: String, // post or profilephoto
    required: true,
  },
  mediaType: {
    type: String, // (e.g., 'image/jpeg', 'video/mp4')
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  imageUrl: {
    type: String, // Binary data for storing images or videos
    required: true,
  },
  likedAccount:{
    type:[String],   
    default:[],
  },
});

const content = mongoose.model("content", conentSchema);
module.exports = content;
