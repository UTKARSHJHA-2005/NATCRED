import express from "express"
import { createProduct, createShop, getProducts, getSingleProduct } from "../controllers/Product.controller.js"

const router=express.Router()
router.get("/",getProducts)
router.post("/",createProduct)
router.put("/:id",createShop)
router.get("/:id",getSingleProduct)

export default router;