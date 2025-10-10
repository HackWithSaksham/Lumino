import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js";
import userrouter from "./Routes/userrouter.js";
import path from "path";
import multer from "multer";
import http from "http";
import { Server } from "socket.io";
import { Conversation,UserMessage } from "./Models/model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server,{
    cors:{ origin: "http://localhost:5173", credentials: true , methods:["GET","POST"],},
});

let onlineUsers = {};
io.on("connection", (socket) => {
  socket.on("register", (id) => {
    onlineUsers[id] = socket.id;
  });

  socket.on("sendmessage", async ({senderid, receiverid,text}) => {
    let conversation = await Conversation.findOne({
      participants: { $all: [senderid, receiverid], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderid, receiverid],
      });
    }

    const message = await UserMessage.create({
      conversationId: conversation._id,
      sender: senderid,
      receiver: receiverid,
      text: text,
      createdAt: Date.now(),
    });

    if (onlineUsers[receiverid]) {
      io.to(onlineUsers[receiverid]).emit("receivermessage", message)
    }
    io.to(onlineUsers[senderid]).emit("receivermessage", message);
  });
  socket.on("disconnect", () => {
    Object.keys(onlineUsers).forEach((id) => {
      if (onlineUsers[id] === socket.id) delete onlineUsers[id];
    });
});
});
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/flags", express.static(path.join(process.cwd(), "flags")));
const port = process.env.PORT || 4000;
connectDB();
const allowedOrigins = ["http://localhost:5173"];

app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))
app.use('/api/user',userrouter);

app.get("/", (req, res) => res.send("API Working"));

server.listen(port, () => {
  console.log("Server started");
});

