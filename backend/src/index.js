import express from "express"
import authRouter from "./routes/auth.route.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js"
import { app, server } from "./lib/socket.js";
import cors from "cors";
import messageRouter from "./routes/message.route.js";
import path from "path";
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
dotenv.config()

app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
}
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})
server.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
    connectDB()
})
