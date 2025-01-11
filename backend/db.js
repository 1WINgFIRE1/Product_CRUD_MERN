import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
const url = process.env.MONGOURL

export default async function connectDB(){
    try{
        await mongoose.connect(url)
        console.log("Connected to db....")

    }
    catch(e){
        console.log(`${e.message}...Not Connected!`)
    }
}