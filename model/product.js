
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand:{
    type:String,
    required: true
  },
  model:{
    type:String,
    required:true
  },
  color:{
    type:String
  },
  discount:{
    type:Number
  }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
