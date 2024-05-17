import connectDb from "./mongoose";

const handler = async (req, res) => {
    const { city } = req.query;
    const url = `https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RapidAPI_HOST_Air
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        res.status(201).json({ success: true, result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch air quality information' });
    }
}

export default connectDb(handler);
