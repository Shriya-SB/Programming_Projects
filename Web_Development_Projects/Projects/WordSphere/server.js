const express = require('express')
const axios = require('axios')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static('templates'))

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'templates/index.html'))
})

app.get('/search', async (req, res) => {
    const input = req.query.word; // Correctly access the query parameter containing the word
    const options = {
        method: 'GET',
        url: 'https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary',
        params: { word: input },
        headers: {
            'X-RapidAPI-Key': '5e0b58d473mshe8d525e781c02d1p1bde9fjsnc6b41a538d30',
            'X-RapidAPI-Host': 'dictionary-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response);
        res.json(response.data); // Send only the data property of the response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data' }); // Handle errors
    }
})

app.listen(port, () => {
    console.log(`App is listening at port ${port}`);
})
