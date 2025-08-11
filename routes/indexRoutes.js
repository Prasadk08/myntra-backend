import express from "express";
import {
  signupcontroller,
  logincontroller,
  getAllProductController,
  getoneProductController,
} from "../controller/indexController.js";

const router = express.Router();

router.post("/signup", signupcontroller);

router.post("/login", logincontroller);

router.get("/getallproduct", getAllProductController);

router.get("/getoneproduct/:id", getoneProductController);

export default router