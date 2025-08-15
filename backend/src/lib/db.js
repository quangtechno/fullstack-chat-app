import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
export const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_DB)
        console.log(`mongo DB connected: ${conn.connection.host}`)
    }catch(error){
        console.log(error)
    }
}