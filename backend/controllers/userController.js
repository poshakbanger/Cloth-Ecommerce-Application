import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);    //write through chatgpt
}

// Route for user login
const loginUser = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        //const user = await newUser.save();

        if (!user) {
            return res.json({success:false, message: "User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Route for user register
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking user already exists or not
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false, message: "User Registerd Successfully."})
        }

        //  Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please Enter a valid Email"})
        }
        if (password.length < 8) {
            return res.json({success:false, message:"Please Enter a strong Password"})
        }

        // Hashing user Password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save() 
        if (!user) {
            return res.json({ success: false, message: "User registration failed" });    // through gpt
        }

        const token = createToken(user._id)

        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token})  
        } else{
            res.json({success:true, message:"Invalid Credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export { loginUser, registerUser, adminLogin }