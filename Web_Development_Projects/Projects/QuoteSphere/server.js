const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const port = 5000;

// Define a route for the home page of our website.
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.get('/generator', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: 'https://quotes-by-api-ninjas.p.rapidapi.com/v1/quotes',
            headers: {
                'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
                'X-RapidAPI-Host': 'quotes-by-api-ninjas.p.rapidapi.com'
            }
        };
        
        const response = await axios.request(options);
        const quote = response.data[0].quote;
        // Send the quote back to the client
        res.send(quote);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching quote');
    }
});


// Listen for the app
app.listen(port, () => { console.log(`Server is running at http://localhost:${port}`); });
