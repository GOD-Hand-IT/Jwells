import cors from 'cors'
import express from "express";
import 'dotenv/config'
import mongoose from 'mongoose';
import connectDB from './config/mongoose.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(cors());



server.use("/user", userRouter)
server.use("/product", productRouter)



// const storage  = multer.diskStorage({
Promise.all([connectDB(), connectCloudinary()])
  .then(() => {
    console.log("Connected to MongoDB and Cloudinary");
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Connection error:', error);
    process.exit(1);
  });



