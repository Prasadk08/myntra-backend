import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        let conn = await mongoose.connect("mongodb://localhost:27017/myntra")
        console.log("Connected to database successfully")
    }catch(e){
        console.log("Something Went wrong while connecting Database")
        process.exit(1)
    }
}

export default connectDB;