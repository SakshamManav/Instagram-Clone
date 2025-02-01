const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const connectMongoDb = require("./db.js");
const webSocketConnection = require("./routes/Websocket.js")

connectMongoDb();



app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://192.168.29.16:3000, http://localhost:3000, https://instagram-clone-mocha-zeta.vercel.app"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );

app.use(cors());

app.use("/insta/user", require("./routes/User.js"));
app.use("/insta/content", require("./routes/Content.js"));


const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});



module.exports = server;

// console.log(server)
webSocketConnection(server);

