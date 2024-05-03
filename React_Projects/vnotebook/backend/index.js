const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')
connectToMongo();

const app = express()
const port = 6000;

app.use(cors())
app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/notes'))

app.listen(port, () => { console.log(`Connected to mongo at port ${port}`) })