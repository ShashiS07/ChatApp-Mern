const express = require("express");
const route = require("./route/routes");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.log(err));

app.use("/", route);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
