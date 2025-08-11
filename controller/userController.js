
import User from "../model/user.js"
import Order from "../model/orders.js";


export const addTocart = async (req, res) => {
  let productId = req.params.id;

  try {
    let currentUser = await User.findById(req.user.id);
    if (!currentUser.cart.includes(req.params.id)) {
      currentUser.cart.push(productId);
      await currentUser.save();
    }

    res.status(201).json({ message: "Item added to cart" });
  } catch (e) {
    res
      .status(400)
      .json({ message: "Something went wrong while adding to cart" });
  }
};


export const addtowish = async (req, res) => {
  try {
    let currUser = await User.findById(req.user.id);
    if (!currUser.wishlist.includes(req.params.id)) {
      currUser.wishlist.push(req.params.id);
      await currUser.save();
    }

    res.status(201).json({ message: "Item added to Wishlist" });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong while wishlisting" });
  }
};


export const placeOrder = async (req, res) => {
  try {
    let newOrder = new Order();
    let placeorder = await User.findById(req.user.id);

    newOrder.userid = req.user.id;
    newOrder.orders = placeorder.cart;
    newOrder.totalBill = req.query.totalBill;

    placeorder.myorders.push(newOrder._id);
    placeorder.cart = [];

    await newOrder.save();
    await placeorder.save();

    res.status(200).json({ message: "Order Placed Successfully" });
  } catch (e) {
    res.status(500).json({ message: "Failed to place the order" });
  }
};


export const getMyorder = async (req, res) => {
  try {
    let user = await User.findById(req.user.id).populate("myorders");
    res.status(200).json(user.myorders);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch myorders" });
  }
};
