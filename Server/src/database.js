import {MongoClient} from 'mongodb'

let mongoUrl = 'mongodb://localhost:27017/demo'
let mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}
let collections = {
    machines: null
}

MongoClient.connect(mongoUrl, mongoOptions, function (err, db) {
    if (err) {
        throw err;
    }
    collections.machines = db.db('demo').collection('machines')
});

export function fetchMachineData() {
    const simulateMachines = (machines) => {
        for (let machine of machines) {
            // When "demo" is set, the value will change slightly to simulate data
            if (machine['type'] === 'sim') {
                for (let valuePair of machine['values']) {
                    if (valuePair['type'] === 'm2c') {
                        valuePair.value += (Math.random() - 0.5)
                    }
                }
            }
        }
        return machines
    }

    return collections.machines
        .find()
        .toArray()
        .then(simulateMachines)
}

export function setMachineValue(machineID, valueName, value) {
    const v = {}
    v['values.' + valueName] = value

    const filter = {_id: machineID}
    const update = {$set: v}

    return collections.machines.updateOne(filter, update)
}
