export default async function handler(req, res) {
    try {
        let pins = {
            "560072": ["Bengaluru", "Karnataka"],
            "400001": ["Mumbai", "Maharashtra"],
            "110001": ["Delhi", "Delhi"],
            "600001": ['Chennai', 'Tamil Nadu'],
            "700001": ["KolKata", 'West Bengal'],
            "12201": ["New York", "Albany"],
        }
        res.status(201).json(pins)
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, error: error })
    }
}