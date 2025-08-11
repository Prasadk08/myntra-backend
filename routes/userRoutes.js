import express from "express"
import { checkToken } from "../middleware/checktoken.js"
import { addTocart,addtowish,placeOrder,getMyorder } from "../controller/userController.js"

const router = express.Router()


router.post("/addtocart/:id",checkToken,addTocart)

router.post("/addtowish/:id",checkToken,addtowish)

router.post("/placeorder",checkToken,placeOrder)

router.get("/myorders",checkToken,getMyorder)

export default router