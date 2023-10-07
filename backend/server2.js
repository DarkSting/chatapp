// importing the modules
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { Server, Socket } = require('socket.io');
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");


// app config
const app = express();
const  http = require('http');
const httpServer = http.createServer(app)
const io = new Server(httpServer,{
  cors:{origin:"*"}
});

//middlewares
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

console.log("running server 2")

// mongodb
mongoose
  .connect("mongodb+srv://akash:akash123@cluster0.24bmwfn.mongodb.net/chat", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {console.log(`Database Connection Established at ${27017}`)


})
  .catch((err) => console.log(err));

//port
const PORT = process.env.PORT|| 5000;

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });
  
  });


//listen
httpServer.listen(PORT, () => console.log(`server started at ${process.env.PORT}`));


