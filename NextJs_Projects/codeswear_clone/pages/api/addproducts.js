import connectDb from "./mongoose"
import Product from "./models/Product"

const handler = async (req, res) => {
    try {
        if (req.method === "POST") {
            for (let i = 0; i < req.body.length; i++) {
                let p = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    img: req.body[i].img,
                    price: req.body[i].price,
                    color: req.body[i].color,
                    desc: req.body[i].desc,
                    size: req.body[i].size,
                    img: req.body[i].img,
                    availableQty: req.body[i].availableQty,
                    category: req.body[i].category,
                })
                await p.save()
                res.status(201).json({ success: true, message: 'Product Added Successfully!', products: p })
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