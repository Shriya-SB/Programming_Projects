const express = require('express')
const path = require("path")
const multer = require('multer')
const mergedPdfs = require('./merge')

const upload = multer({ dest: 'uploads/' })
const app = express()
app.use('/static', express.static('public'))
const port = 4000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})
app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files)
    let d = await mergedPdfs(path.join(__dirname, req.files[0].path), (path.join(__dirname, req.files[1].path)))
    res.redirect(`http://localhost:4000/static/${d}.pdf`)
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})