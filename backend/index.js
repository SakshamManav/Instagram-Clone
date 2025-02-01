const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const connectMongoDb = require("./db.js");
const webSocketConnection = require("./routes/Websocket.js");

connectMongoDb();

app.use(express.json());
app.use(
  cors({
    origin: "https://instagram-clone-mocha-zeta.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



app.use("/insta/user", require("./routes/User.js"));
app.use("/insta/content", require("./routes/Content.js"));

const server = app.listen(PORT,  () => {
  console.log(`Server running at ${PORT}`);
});

module.exports = server;

// console.log(server)
webSocketConnection(server);
