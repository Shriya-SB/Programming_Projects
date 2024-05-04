import User from "./models/User";
import connectDb from "./mongoose";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_KEY).toString()
            })
            await newUser.save()
            res.status(201).json({ success: true, message: 'Account created successfully!', credentials: newUser })
        } else {
            res.status(405).json({ success: false, error: 'This method is not allowed!' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

export default connectDb(handler)