import cors from 'cors'
import express from "express";
import 'dotenv/config'
import mongoose from 'mongoose';
import path from 'path'
import connectDB from './config/mongoose.js';
import connectCloudinary from './config/cloudinary.js';
import { UserController } from './controller/userController.js';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.json());
server.use(cors());




connectDB()
connectCloudinary()

server.post("/register" , UserController.registerUser )
server.post("/login" , UserController.loginUser)

// const storage  = multer.diskStorage({
//   destination : './upload/images',
//   filename:(req , file ,cb) => {
//     return cb(null , `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })

// const upload = multer({storage : storage})

// server.use("/images",express.static('upload/images'))
// server.post("/upload",upload.single('product') , (req , res) => {
//   res.json({
//     success : 1,
//     image : `http://localhost:${port}/images/${req.file.fieldname}`
//   })
// })
server.listen(port, (req, res) => {
  console.log("Server running on port " + port);
});

mongoose.connect
