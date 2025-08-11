
import User from "../model/user.js"


export const showcartController = async(req,res)=>{
    try{
        let currUser = await User.findById(req.user.id).populate("cart")
        res.status(200).json(currUser.cart)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching cart"})
    }
}


export const showWishlistController = async(req,res)=>{
    try{
        let currUser = await User.findById(req.user.id).populate("wishlist")
        res.status(200).json(currUser.wishlist)
    }catch(e){
        res.status(500).json({message:"Something went wrong fetching wishlist"})
    }
}
