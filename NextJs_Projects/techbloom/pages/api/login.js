import User from "./models/User"
import connectToDb from "./mongoose"
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let user = await User.findOne({ email: req.body.email })
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_KEY);
            var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.password === decryptedData && req.body.email === user.email) {
                    let token = jwt.sign({ name: req.body.name, email: req.body.email }, process.env.JWT_KEY)
                    res.status(201).json({ success: true, message: 'User Logged-In Successfully!', token: token, email: req.body.email })
                } else {
                    res.status(401).json({ success: false, error: 'Enter Valid Credentials!' })
                }
            } else {
                res.status(401).json({ success: false, error: 'Please Create An Account!' })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error })

        }
    } else {
        res.status(405).send("This method is not allowed!!")
    }
}

export default connectToDb(handler)