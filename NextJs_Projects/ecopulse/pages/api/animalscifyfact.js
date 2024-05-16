import connectDb from "./mongoose";

const handler = async (req, res) => {
    const { name } = req.query;
    const url = `https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=${name}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
            'X-RapidAPI-Host': 'animals-by-api-ninjas.p.rapidapi.com'
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
