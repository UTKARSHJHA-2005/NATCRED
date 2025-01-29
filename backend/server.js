import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user_routes.js";
// import postRoute from "./routes/post_route.js";
// import projectRoute from "./routes/project_route.js;"
dotenv.config({});

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
};
app.use(cors(corsOptions));
app.use("/api/v2/user", userRoute);
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});