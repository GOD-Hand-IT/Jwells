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
connectDB().then(() => {
  console.log("Connected to cloudinary")
  connectCloudinary()
}).then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});



