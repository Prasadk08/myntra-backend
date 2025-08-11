
import jwt from "jsonwebtoken";
import User from "../model/user.js"
import bcrypt from "bcrypt"
import Product from "../model/product.js";


export const signupcontroller = async(req,res)=>{
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

}

export const logincontroller =async(req,res)=>{
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
}



export const getAllProductController = async(req,res)=>{
    try{
        let alldata = await Product.find()
        res.status(200).json(alldata)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching all data"})
    }
}


export const getoneProductController = async(req,res)=>{
    try{
        let data = await Product.findById(req.params.id);
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching one data"})
    }
}

