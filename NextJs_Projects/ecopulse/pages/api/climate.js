import connectDb from "./mongoose";

const handler = async (req, res) => {
    const url = 'https://climate-news-feed.p.rapidapi.com/page/1?limit=20';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
            'X-RapidAPI-Host': 'climate-news-feed.p.rapidapi.com'
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
