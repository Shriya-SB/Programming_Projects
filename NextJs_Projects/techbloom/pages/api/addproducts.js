import Product from "./models/Product";
import connectToDb from "./mongoose";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            for (let i = 0; i < req.body.length; i++) {
                let product = new Product({
                    title: req.body[i].title,
                    slug: req.body[i].slug,
                    category: req.body[i].category,
                    availableQty: req.body[i].availableQty,
                    color: req.body[i].color,
                    ram: req.body[i].ram,
                    display: req.body[i].display,
                    storage: req.body[i].storage,
                    webcamp: req.body[i].webcamp,
                    memory: req.body[i].memory,
                    price: req.body[i].price,
                    desc: req.body[i].desc,
                    img: req.body[i].img,
                    sound_driver: req.body[i].sound_driver,
                })
                await product.save()
                res.status(201).json({ success: true, message: 'Product Added Successfully!', product: product })
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error })
        }
    } else {
        res.status(405).json({ success: false, error: 'This method is not allowed!!' })
    }
}

export default connectToDb(handler)