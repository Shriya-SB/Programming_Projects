import Product from "./models/Product"
import connectDb from "./mongoose"

const handler = async (req, res) => {
    try {
        let products = await Product.find({ category: 'tshirt' })
        let tshirts = {}
        for (let item of products) {
            if (item.title in tshirts) {
                if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                    tshirts[item.title].color.push(item.color)
                }
                if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                    tshirts[item.title].size.push(item.size)
                }
            } else {
                tshirts[item.title] = JSON.parse(JSON.stringify(item))
                tshirts[item.title].color = [item.color]
                tshirts[item.title].size = [item.size]
            }
        }
        res.status(201).json({ success: true, products: tshirts })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
export default connectDb(handler)