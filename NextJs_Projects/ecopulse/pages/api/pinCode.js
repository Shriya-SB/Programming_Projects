const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const { pincode } = req.query;
            const url = `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
                    'X-RapidAPI-Host': 'india-pincode-with-latitude-and-longitude.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            if (data && data.length > 0) {
                res.status(200).json({ success: true, data });
            } else {
                res.status(404).json({ success: false, error: 'Pincode not found' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}

export default handler;
