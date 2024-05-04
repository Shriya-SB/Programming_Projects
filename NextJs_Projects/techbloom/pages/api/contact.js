import Contact from "./models/Contact"
import connectToDb from "./mongoose"

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const contact = new Contact({
                name: req.body.name,
                email: req.body.email,
                address: req.body.address,
                phone: req.body.phone,
                pinCode: req.body.pinCode,
                city: req.body.city,
                state: req.body.state,
            })
            await contact.save()
            res.status(200).json({ success: true, message: 'contact Credentials Sent Successfully!', data: contact })
        } catch (error) {
            res.status(500).json({ success: false, error: error })

        }
    } else {
        res.status(405).send("This method is not allowed!!")
    }
}

export default connectToDb(handler)