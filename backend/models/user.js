const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileimageUrl: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
  },
  followers:{
    type:[String],
    default:[],
  },
  following:{
    type:[String],
    default:[],
  },
});
const user = mongoose.model("user", userSchema);
module.exports = user;
