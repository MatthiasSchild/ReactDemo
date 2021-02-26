const express = require('express');
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors())

app.get('/fetch', (req, res) => {
    res.send([
        {
            name: 'temperature',
            value: 512,
        }
    ])
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
