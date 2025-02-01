const mongoose =require("mongoose");
const mongoUri = "mongodb+srv://sakshammanav:uvjRp5XjcK2yvIoC@cluster0.h0pto.mongodb.net/Instagram?retryWrites=true&w=majority&appName=Cluster0";
async function connectMongo(){
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully!");
}
module.exports = connectMongo;