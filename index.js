
import app from "./app.js"
import connectDB from "./config/database.js"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const port =8080

connectDB()

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
