
import express from "express"
import jwt from "jsonwebtoken";
import User from "./model/user.js"
import bcrypt from "bcrypt"
import { checkToken } from "./middleware/checktoken.js";
import cors from "cors"
import axios, { all } from "axios";
import Product from "./model/product.js";
import Order from "./model/orders.js";

const app = express()

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true
}));

app.use(express.json())

app.post("/signup",async(req,res)=>{
    let {name,mobile,address,password}=req.body

    try{
        let number = Number(mobile)
        let check = await User.find({number})
        if(check.length>0) return res.status(400).json({message:"Mobile Number is already registered"})

        const hashedPassword = await bcrypt.hash(password,10)

        let data ={name,mobile:number,address,password:hashedPassword,wishlist:[],cart:[],myorders:[]}
        let newUser = new User(data)
        await newUser.save();

        const token = jwt.sign(
            {id:newUser._id,mobile:newUser.mobile},
            "afjaosifasfasfas",
            {expiresIn:"2h"}
        )

        res.status(201).json({message:"User registered Successfully",token})
    }catch(e){
        res.status(500).json({message:"Something went wrong while registering"})
    }

})

app.post("/login",async(req,res)=>{
    let{mobile,password}=req.body

    try{
        let num = Number(mobile)
        let checkUser = await User.findOne({mobile:num});
        if(!checkUser) return res.status(400).json({message:"Mobile Number is not registered"})

        let matched = await bcrypt.compare(password,checkUser.password)

        if(!matched) return res.status(401).json({message:"Wrong Password"})

        const token = jwt.sign(
            {id:checkUser._id,mobile:checkUser.mobile},
            "afjaosifasfasfas",
            {expiresIn:"2h"}
        )
        res.status(200).json({message:"Login Successful",token})
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ msg: "Something went wrong while logging" });
    }
})


app.post("/user/addtocart/:id",checkToken, async(req,res)=>{

    let productId= req.params.id

    try{
        let currentUser = await User.findById(req.user.id)
         if(!currentUser.cart.includes(req.params.id)){
            currentUser.cart.push(productId)
            await currentUser.save()
        }

        res.status(201).json({message:"Item added to cart"})

    }catch(e){
        res.status(400).json({message:"Something went wrong while adding to cart"})
    }

})

app.post("/user/addtowish/:id",checkToken,async(req,res)=>{
    try{
        let currUser = await User.findById(req.user.id)
        if(!currUser.wishlist.includes(req.params.id)){
            currUser.wishlist.push(req.params.id)
            await currUser.save()
        }

        res.status(201).json({message:"Item added to Wishlist"})

    }catch(e){
        res.status(400).json({message:"Something went wrong while wishlisting"})
    }
})

app.get("/show/cart",checkToken,async(req,res)=>{
    try{
        let currUser = await User.findById(req.user.id).populate("cart")
        res.status(200).json(currUser.cart)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching cart"})
    }
})

app.get("/show/wishlist",checkToken,async(req,res)=>{
    try{
        let currUser = await User.findById(req.user.id).populate("wishlist")
        res.status(200).json(currUser.wishlist)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching wishlist"})
    }
})

app.get("/getallproduct",async(req,res)=>{
    try{
        let alldata = await Product.find()
        res.status(200).json(alldata)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching all data"})
    }
})

app.get("/getoneproduct/:id",async(req,res)=>{
    try{
        let data = await Product.findById(req.params.id);
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching all data"})
    }
})


app.post("/user/placeorder",checkToken,async(req,res)=>{
    try{
        let newOrder = new Order()
        let placeorder = await User.findById(req.user.id)

        newOrder.userid=req.user.id
        newOrder.orders=placeorder.cart
        newOrder.totalBill=req.query.totalBill

        placeorder.myorders.push(newOrder._id)
        placeorder.cart=[]

        await newOrder.save()
        await placeorder.save()

        res.status(200).json({message:"Order Placed Successfully"})
    }catch(e){
        res.status(500).json({message:"Failed to place the order"})
    }
})

export default app;

























