import cors from 'cors'
import express from 'express'
import collections from './database'

const app = express()
const port = 3001

app.use(cors())

app.get('/fetch', (req, res) => {
    collections.machines.find().toArray((err, result) => {
        if (err) throw err;

        for (let r of result) {
            // When "demo" is set, the value will change slightly to simulate data
            if (r['demo']) {
                for (let valuePair of r['values']) {
                    valuePair.value += (Math.random() - 0.5)
                }
            }
        }

        res.send(result)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
