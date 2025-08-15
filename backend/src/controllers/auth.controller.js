import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"
const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    console.log(req.body)
    try {
        if (password.length < 6) {
            return res.status(400).json({ message: " pass must be longer than 6 characters" })
        }
        const user = await User.findOne({ email })
        if (user)
            return res.status(400).json({ message: "email is already taken" })
        const salt = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(password, salt)
        const newUser = new User({
            fullName,
            email,
            password: hashedPasword,
        })
        if (newUser) {
            //generate jwt token here
            await newUser.save()
            generateToken(newUser._id, res)
            res.status(201).json({ _id: newUser._id })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal Server Error" })
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    try {
        const foundUser = await User.findOne({ email })
        if (foundUser) {
            const isPassCorrect = await bcrypt.compare(password, foundUser.password)
            if (!isPassCorrect) {
                res.status(500).json({ message: "wrong password" })
            }
            generateToken(foundUser._id, res);
            res.status(200).json(foundUser)
        } else {
            res.status(500).json({ message: "user not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "error in server" })

    }
}
const logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "logged out successfully" })
}
// const 
export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id

        if (!profilePic) {
            return res.status(400).json({ message: "profile pic is required" })
        }
        const uploadReponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadReponse.secure_url }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "internal server error" })
    }
}
export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}

export { login, signup, logout }