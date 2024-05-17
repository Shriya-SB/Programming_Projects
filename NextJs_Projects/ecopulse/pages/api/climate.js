import connectDb from "./mongoose";

const handler = async (req, res) => {
    const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=20';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.X_RapidAPI_KEY,
            'X-RapidAPI-Host': process.env.X_RapidAPI_HOST_Climate
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        res.status(201).json({ success: true, result: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to fetch climate news' });
    }
}

export default connectDb(handler);
