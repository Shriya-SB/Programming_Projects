import User from "./models/User";
import connectDb from "./mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let user = req.body.token
            let data = jwt.verify(user, process.env.JWT_KEY)
            let dbuser = await User.findOne({ email: data.email })
            const { name, email, _id, phone, address, pinCode, city, state } = dbuser;
            res.status(201).json({ success: true, name, email, _id, phone, address, pinCode, city, state })
        } else {
            res.status(405).json({ success: false, error: 'This method is not allowed!' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

export default connectDb(handler)