import User from "./models/User";
import connectToDb from "./mongoose";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let token = req.body.token;
            let data = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findOneAndUpdate({ email: data.email }, { address: req.body.address, name: req.body.name, phone: req.body.phone, pinCode: req.body.pinCode, city: req.body.city, state: req.body.state })
            res.status(201).json({ success: true })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    } else {
        res.status(405).json({ success: false, error: 'This method is not allowed!!' })
    }
}

export default connectToDb(handler)