import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if (!decoded) {
            return res.status(400).json({ message: "Unautherized - no token provided" });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(400).json({ message: "Unautherized - no token provided" });
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Unautherized - no token provided" });
    }

}