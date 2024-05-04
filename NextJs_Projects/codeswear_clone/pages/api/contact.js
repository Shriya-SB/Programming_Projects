import connectDb from "./mongoose"
import Contact from "./models/Contact"

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            let newContact = new Contact({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                pinCode: req.body.pinCode,
                city: req.body.city,
                state: req.body.state,
                phone: req.body.phone,
            })
            await newContact.save()
            res.status(201).json({ success: true, message: 'User Data Sent Successfully!!', credentials: newContact })
        } else {
            res.status(405).json({ success: false, error: 'This method is not allowed!!' })
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}

export default connectDb(handler)