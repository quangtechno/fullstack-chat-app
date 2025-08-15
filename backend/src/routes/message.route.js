import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessages } from "../controllers/message.controller.js";
const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersForSidebar)

messageRouter.get("/:id", protectRoute, getMessages)

messageRouter.post("/send/:id", protectRoute, sendMessages);
export default messageRouter;