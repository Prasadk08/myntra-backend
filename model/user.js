import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String},
    mobile:{type:Number},
    address:{type:String},
    password:{type:String},
    wishlist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    myorders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order"
    }]
})

const User = mongoose.model('User',userSchema)
export default User;