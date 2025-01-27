import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModal from '../model/userModal.js'
import { createToken, setAuthCookie } from '../middleware/authMiddleware.js'


export default class UserController {

    static registerUser = async (req, res) => {
        try {
            const { name, email, password } = req.body
            const exists = await userModal.findOne({ email })

            if (exists) {
                return res.json({ success: false, message: "User already exists" })
            }

            if (!validator.isEmail(email)) {
                return res.json({ success: false, message: "Enter valid email address" })
            }

            if (password.length < 6) {
                return res.json({ success: false, message: "Password must be minimum 6 characters" })
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            const newUser = new userModal({
                name: name,
                email: email,
                password: hashedPassword
            })

            const user = await newUser.save()
            const token = createToken(user.id)
            setAuthCookie(res, token)
            return res.status(201).json({ 
                success: true, 
                message: "Registration successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({ error: error.message })
        }
    }

    static loginUser = async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await userModal.findOne({ email })
            if (!user) {
                return res.json({ success: false, message: "User doesn't exists!" })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                res.json({ success: false, message: "Invalid credentials" })
            }
            else {
                const token = createToken(user.id)
                setAuthCookie(res, token)
                res.status(200).json({ 
                    success: true, 
                    message: "Login successful",
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
            }
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
}