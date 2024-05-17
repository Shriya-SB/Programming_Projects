import connectDb from "./mongoose";

const handler = async (req, res) => {
    const { name } = req.query;
    const url = `https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RapidAPI_HOST_Animal
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

export default connectDb(handler);
