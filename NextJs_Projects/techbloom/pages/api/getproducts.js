import Product from "@/pages/api/models/Product";
import connectDB from "@/pages/api/mongoose";

const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            let products = await Product.find()
            // const mobile = {}
            // for (let item of products) {
            //     if (item.title in mobile) {
            //         if (!mobile[item.title].color.includes(item.color) && item.availableQty > 0) {
            //             mobile[item.title].color.push(item.color)
            //         }
            //         if (!mobile[item.title].ram.includes(item.ram) && item.availableQty > 0) {
            //             mobile[item.title].ram.push(item.ram)
            //         }
            //     } else {
            //         mobile[item.title] = JSON.parse(JSON.stringify(item))
            //         if (item.availableQty > 0) {
            //             mobile[item.title].color = [item.color]
            //             mobile[item.title].ram = [item.ram]
            //         }
            //     }
            // }
            res.status(201).json({ success: true, products: products })
        } catch (error) {
            console.log(error)
            res.status(401).json({ success: false, message: error })
        }
    } else {
        res.status(405).json({ success: false, message: 'This method is not allowed!!' })
    }
}

export default connectDB(handler);