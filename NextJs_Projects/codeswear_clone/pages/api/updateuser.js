import User from "./models/User";
import connectDb from "./mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let user = req.body.token
            let data = jwt.verify(user, process.env.JWT_KEY)
            let dbuser = await User.findOneAndUpdate({ email: data.email }, {name: req.body.name, address: req.body.address, phone: req.body.phone, pinCode: req.body.pinCode, city: req.body.city, state: req.body.state })
            res.status(201).json({ success: true })
        } else {
            res.status(405).json({ success: false, error: 'This method is not allowed!' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

export default connectDb(handler)