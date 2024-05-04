import Product from "./models/Product";
import connectToDb from "./mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let product = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
                res.status(201).json({ success: true, message: 'Product Updated Successfully!' })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    } else {
        res.status(405).json({ success: false, error: 'This method is not allowed!!' })
    }
}

export default connectToDb(handler)