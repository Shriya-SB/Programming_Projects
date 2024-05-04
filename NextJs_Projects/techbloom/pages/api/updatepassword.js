import User from "./models/User";
import connectToDb from "./mongoose";
import jwt from 'jsonwebtoken'
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let token = req.body.token;
            let dbuser = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findOne({ email: dbuser.email })
            let bytes = CryptoJS.AES.decrypt(user.password, process.env.JWT_KEY);
            let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            if (user) {
                if (req.body.password === decryptedData && req.body.cpassword === req.body.npassword) {
                    let newPass = await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.cpassword, process.env.JWT_KEY).toString() });
                    res.status(201).json({ success: true, message: 'User Password Updated Successfully!' })
                    return
                } else {
                    res.status(401).json({ success: false, error: 'Enter Valid Credentials!' })
                }
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    } else {
        res.status(405).json({ success: false, error: 'This method is not allowed!!' })
    }
}

export default connectToDb(handler)