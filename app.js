
import express from "express"
import jwt from "jsonwebtoken";
import User from "./model/user.js"
import bcrypt from "bcrypt"
import { checkToken } from "./middleware/checktoken.js";
import cors from "cors"
import axios, { all } from "axios";
import Product from "./model/product.js";
import Order from "./model/orders.js";

import userRoutes from "./routes/userRoutes.js"
import showRoutes from "./routes/showRoutes.js"
import indexRoutes from "./routes/indexRoutes.js"

const app = express()

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(express.json())

app.use("/user",userRoutes)
app.use("/show",showRoutes)
app.use("/",indexRoutes)


export default app;

























