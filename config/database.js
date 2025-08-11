import axios from "axios";
import mongoose from "mongoose";
import Product from "../model/product.js";

const connectDB = async()=>{
    try{
        let MONGO_URL = process.env.MONGO_URL
        let conn = await mongoose.connect(MONGO_URL)
        console.log("Connected to database successfully")
    }catch(e){
        console.log("Something Went wrong while connecting Database")
        process.exit(1)
    }
}

export default connectDB;
