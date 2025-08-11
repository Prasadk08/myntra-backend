import express from "express"
import { checkToken } from "../middleware/checktoken.js"
import { showWishlistController,showcartController } from "../controller/showController.js"

const router = express.Router()

router.get("/cart",checkToken,showcartController)

router.get("/wishlist",checkToken,showWishlistController)

export default router