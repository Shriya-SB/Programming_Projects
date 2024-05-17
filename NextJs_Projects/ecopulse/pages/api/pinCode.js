const handler = async (req, res) => {
    if (req.method === "GET") {
        try {
            const { pincode } = req.query;
            const url = `https://india-pincode-with-latitude-and-longitude.p.rapidapi.com/api/v1/pincode/${pincode}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': process.env.X_RapidAPI_Key,
                    'X-RapidAPI-Host': process.env.X_RapidAPI_HOST_PinCode
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
