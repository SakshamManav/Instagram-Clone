const mongoose =require("mongoose");
const mongoUri = `mongodb+srv://${process.env.DBUSER}:${process.env.DBUSERPASSWORD}@cluster0.h0pto.mongodb.net/Instagram?retryWrites=true&w=majority&appName=Cluster0`;

async function connectMongo(){
    await mongoose.connect(mongoUri);
    console.log("Database connected successfully!");
}
module.exports = connectMongo;