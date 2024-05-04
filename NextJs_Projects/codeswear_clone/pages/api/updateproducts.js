import connectDb from "./mongoose";
import Product from "./models/Product";

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            for (let i = 0; i < req.body.length; i++) {
                let p = await Product.findByIdAndUpdate(req.body[i]._id, req.body[i])
                await p.save()
                res.status(201).json({ success: true, message: 'Product Updated Successfully!' })
            }
        }
        else {
            res.status(405).json({ success: false, error: 'This method is not allowed!!' })

        }
    } catch (error) {
        res.status(500).json({ success: false, error: error })
        console.log(error);
    }
}

export default connectDb(handler)