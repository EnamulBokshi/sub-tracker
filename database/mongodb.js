import mongoose from "mongoose";
import { DATABASE_URI,MODE_ENV } from "../config/env.js";


if(!DATABASE_URI){
    throw new Error("Please provide a database URI")
}

const connectToDatabase = async ()=>{
    try {
        await mongoose.connect(DATABASE_URI)
        console.log(`Database connected successfully in ${MODE_ENV} mode`)
    } catch (error) {
        console.log("Error connecting to database",error)
        process.exit(1)
    }
}

export default connectToDatabase;