
import app from "./app.js"
import connectDB from "./config/database.js"


const port =8080

connectDB()

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})
