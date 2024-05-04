import User from "./models/User";
import connectDb from "./mongoose";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let user = await User.findOne({ email: req.body.email })
            let bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_KEY);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (decryptedData === req.body.password && req.body.email === user.email) {
                    let token = jwt.sign({ name: req.body.name, email: req.body.email }, process.env.JWT_KEY)
                    res.status(201).json({ success: true, message: 'User logged-in successfully!', token: token, email: req.body.email })
                }
            } else {
                res.status(401).json({ success: false, error: 'Please create an account!' })
            }
        } else {
            res.status(405).json({ success: false, error: 'This method is not allowed!' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

export default connectDb(handler)