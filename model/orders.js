import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orders:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    totalBill:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
    
})

const Order = mongoose.model('Order',orderSchema)
export default Order