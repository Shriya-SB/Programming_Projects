const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongoClient } = require('mongodb');

const app = express()
const port = 4000

app.use(bodyParser.json())
app.use(cors())

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'keykrypt';
client.connect();

// Get all the passwords from database
app.get('/getpasswords', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

    if (findResult.length === 0) {
        return res.status(404).json({ success: false, message: 'No passwords found' });
    }

    console.log(findResult); // Output the result to console
    res.json({ success: true, result: findResult }); // Respond to the request as usual
})


// Add password
app.post('/addpasswords', async (req, res) => {
    try {
        const passwords = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        await collection.insertOne(passwords);

        // Retrieve the updated list of passwords after insertion
        const updatedPasswords = await collection.find({}).toArray();
        console.log(updatedPasswords);
        res.json({ success: true, result: updatedPasswords });
    } catch (error) {
        console.error('Error adding password:', error);
        res.status(500).json({ success: false, message: 'Error adding password' });
    }
})


// Delete password by its id
app.post('/deletepasswords', async (req, res) => {
    const { id } = req.body; // Assuming you're passing id as { id }
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne({ id: id }); // Assuming your id key is named id

    if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Password not found' });
    }

    // Retrieve the updated list of passwords after deletion
    const updatedPasswords = await collection.find({}).toArray();
    res.json({ success: true, result: updatedPasswords });
})

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
})