import express from 'express'
import  UserController  from '../controller/userController.js'

const router = express.Router()

router.post("/register", UserController.registerUser)
router.post("/login", UserController.loginUser)

export default router