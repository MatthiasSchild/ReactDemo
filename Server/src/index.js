import cors from 'cors'
import express from 'express'
import {fetchMachineData} from './database'

const app = express()
const port = 3001

app.use(cors())
app.use('/api/assets', express.static('./assets'))

app.get('/api/machines', (req, res) => {
    fetchMachineData().then(machines => {
        res.send(machines)
    })
})

app.post('/api/values', (req, res) => {
    console.log(req.toJSON())

    fetchMachineData().then(machines => {
        res.send(machines)
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
