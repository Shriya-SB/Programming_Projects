import User from "./models/User"
import connectToDb from "./mongoose"
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, process.env.JWT_KEY).toString()
            })
            await user.save()
            res.status(201).json({ success: true, message: 'User Created Successfully!!', credentials: user })
        } catch (error) {
            res.status(500).json({ success: false, error: error })

        }
    } else {
        res.status(405).send("This method is not allowed!!")
    }
}

export default connectToDb(handler)