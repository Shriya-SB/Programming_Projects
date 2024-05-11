import connectDb from "./mongoose";

const handler = async (req, res) => {
    const { animal } = req.body
    const url = `https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=${animal}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
            'X-RapidAPI-Host': 'animals-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        res.status(201).json({ success: true, result: result })
    } catch (error) {
        console.error(error);
    }
}

export default connectDb(handler)