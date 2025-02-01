const { Server } = require("socket.io");
const Messsage = require("../models/Websocketmodel");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const secretKey = process.env.secretKey;

const users = {}

function webSocketConnection(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"], 
    }
  });
  
  io.use((socket, next) => {

    const token = socket.handshake.auth.token;

    if (!token) {
        return next(new Error("Authentication error: Token not provided"));
    }

    try {
      
        const user = jwt.verify(token, secretKey);
        socket.user = user.User.id; // Attach user info to the socket object
        users[socket.user] = socket.id;
        next();
    } catch (err) {
        return next(new Error("Authentication error: Invalid token"));
    }
});

  io.on("connection", (socket)=>{
    console.log("A new connection established!!", socket.id)

    socket.on("message", async(data) => {
      console.log("Message received:", data);
     

      const recieverSocketId = users[data.recieverId];

      if(recieverSocketId){
        io.to(recieverSocketId).emit("receiveMessage",{
          message: data.message,
          recieverId:data.recieverId,
          senderId:socket.user,
          timestamp:Date.now(),
        })
      }
      console.log(socket.user, data.recieverId, data.msg);
      try {
        const message = await new Messsage({
          senderId:socket.user,
          recieverId:data.recieverId,
          message:data.message,
        })
        await message.save();
      } catch (error) {
        
      }
      socket.emit("message-sent", data);
  });

  })

  
  
}


module.exports = webSocketConnection;
