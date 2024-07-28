const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const crypto = require('crypto');

const app = express();
const port = 4000;
const encryptionKey = Buffer.from('soapofivjakdospialsofkdowspaosic'); // Ensure this is 32 bytes
const algorithm = 'aes-256-ctr';

app.use(bodyParser.json());
app.use(cors());

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'keykrypt';
client.connect();

const encrypt = (text) => {
    const iv = crypto.randomBytes(16); // 16 bytes for IV
    const cipher = crypto.createCipheriv(algorithm, encryptionKey, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const decrypt = (encryptedText) => {
    try {
        const [ivHex, encryptedHex] = encryptedText.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = crypto.createDecipheriv(algorithm, encryptionKey, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        throw new Error('Invalid IV or decryption error');
    }
};

app.get('/getpasswords', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();

    if (findResult.length === 0) {
        return res.status(404).json({ success: false, message: 'No passwords found' });
    }

    res.json({ success: true, result: findResult });
});

app.post('/addpasswords', async (req, res) => {
    try {
        const { password, ...otherData } = req.body;
        const encryptedPassword = encrypt(password); // Encrypt the password
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        await collection.insertOne({ ...otherData, password: encryptedPassword }); // Store encrypted password

        const updatedPasswords = await collection.find({}).toArray();
        res.json({ success: true, result: updatedPasswords });
    } catch (error) {
        console.error('Error adding password:', error);
        res.status(500).json({ success: false, message: 'Error adding password' });
    }
});

app.post('/deletepasswords', async (req, res) => {
    const { id } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne({ id });

    if (deleteResult.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'Password not found' });
    }

    const updatedPasswords = await collection.find({}).toArray();
    res.json({ success: true, result: updatedPasswords });
});

app.post('/decryptpassword', async (req, res) => {
    const { encryptedPassword } = req.body;
    try {
        const decryptedPassword = decrypt(encryptedPassword);
        res.json({ success: true, decryptedPassword });
    } catch (error) {
        console.error('Error decrypting password:', error.message);
        res.status(500).json({ success: false, message: 'Error decrypting password' });
    }
});

app.listen(port, () => {
    console.log(`App is listening at http://localhost:${port}`);
});
