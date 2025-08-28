import mongoose from "mongoose";
import { type } from "os";

const ProductSchema = new mongoose.Schema({
    productimage: {
        type: String,
    },
    title:{
        type: String,
        required: true,
    },
    Shops: [
        {
            name: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
            discount: Number,
            delivery: String,
            logo: String,
            Value: Number,
            link:{
                type: String,
                required: true,
            }
        },
    ],
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
