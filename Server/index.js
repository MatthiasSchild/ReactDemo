const collections = require('./database.js')
const express = require('express');
const cors = require('cors')
const app = express()

const port = 3001

app.use(cors())

app.get('/fetch', (req, res) => {
    collections.machines.find().toArray((err, result) => {
        if (err) throw err;

        for (let r of result) {
            if (r.demo) {
                r.value += (Math.random() - 0.5)
            }
        }

        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
