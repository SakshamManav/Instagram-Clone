const mongoose = require("mongoose");
const content = require("./Content");

const messageSchema = new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    },
})
module.exports = mongoose.model("message", messageSchema);
