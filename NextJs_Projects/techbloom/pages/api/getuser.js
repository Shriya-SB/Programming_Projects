import User from "./models/User";
import connectToDb from "./mongoose";
import jwt from 'jsonwebtoken'

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let token = req.body.token;
            let data = jwt.verify(token, process.env.JWT_KEY)
            let user = await User.findOne({ email: data.email })
            const { _id, name, email, address, pinCode, city, state, phone } = user;
            res.status(201).json({ success: true, _id: _id, name: name, email: email, address: address, pinCode: pinCode, city: city, state: state, phone: phone })
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    } else {
        res.status(405).json({ success: false, error: 'This method is not allowed!!' })
    }
}

export default connectToDb(handler)