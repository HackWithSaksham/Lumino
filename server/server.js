import express from "express"
import cors from "cors"
import "dotenv/config"
import cookieParser from "cookie-parser"
import connectDB from "./config/mongodb.js";
import userrouter from "./Routes/userrouter.js";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;
connectDB();
const allowedOrigins = ['http://localhost:5173']
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:allowedOrigins,credentials:true}))

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/flags", express.static(path.join(process.cwd(), "flags")));
app.use('/api/user',userrouter);



app.listen(port,()=>console.log("Server Started"));
