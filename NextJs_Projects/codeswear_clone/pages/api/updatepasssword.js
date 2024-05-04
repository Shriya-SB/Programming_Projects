import User from "./models/User";
import connectDb from "./mongoose";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let token = req.body.token
            let data = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findOne({ email: data.email })
            let bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_KEY);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (decryptedData === req.body.password && req.body.cpassword === req.body.npassword) {
                    let dbuser = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.JWT_KEY).toString() })
                    res.status(201).json({ success: true })
                    return
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