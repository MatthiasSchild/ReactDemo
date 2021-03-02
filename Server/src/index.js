import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import {fetchMachineData, setMachineValue} from './database'

const app = express()
const port = 3001
const jsonParser = bodyParser.json()

app.use(cors())
app.use('/api/assets', express.static('./assets'))

app.get('/api/machines', (req, res) => {
    fetchMachineData().then(machines => {
        res.send(machines)
    })
})

app.get('/api/machines/:id', (req, res) => {
    const id = req.params.id
    fetchMachineData(id).then(machines => {
        res.send(machines)
    })
})

app.post('/api/values', jsonParser, (req, res) => {
    if (req.body) {
        const machineID = req.body.machineID
        const valueName = req.body.valueName
        const value = req.body.value

        setMachineValue(machineID, valueName, value).then(() => {
            fetchMachineData().then(machines => {
                res.send(machines)
            })
        })
    }
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
