import {MongoClient, ObjectID} from 'mongodb'
import {recvMessage, sendMessage} from './msg'

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
    attachMQTTSubscriptions()
});

function attachMQTTSubscriptions() {
    collections.machines.find().toArray().then(machines => {
        for (let machine of machines) {
            for (let valuePair of machine.values) {
                const topic = `${machine._id}_${valuePair.name}`
                recvMessage(topic, value => {
                    setMachineValueWithoutMQTT(machine._id, valuePair.name, value)
                })
            }
        }
    })
}

export function fetchMachineData(id = null) {
    const filter = id ? {_id: new ObjectID(id)} : {}

    const simulateMachines = (machines) => {
        for (let machine of machines) {
            // When "demo" is set, the value will change slightly to simulate data
            if (machine['type'] === 'sim') {
                for (let valuePair of machine['values']) {
                    if (valuePair['type'] === 'm2c') {
                        if (typeof (valuePair['value']) === 'number') {
                            valuePair.value += (Math.random() - 0.5)
                        }
                    }
                }
            }
        }
        return machines
    }

    return collections.machines
        .find(filter)
        .toArray()
        .then(simulateMachines)
}

export function setMachineValue(machineID, valueName, value) {
    const topic = `${machineID}_${valueName}`
    sendMessage(topic, value)
    return setMachineValueWithoutMQTT(machineID, valueName, value)
}

export function setMachineValueWithoutMQTT(machineID, valueName, value) {
    const filter = {_id: new ObjectID(machineID)}

    function updateValues(machine) {
        let valueSets = machine.values
        for (let valueSet of valueSets) {
            if (valueSet.name === valueName && valueSet.type === 'c2m') {
                valueSet.value = value
            }
        }
        return valueSets
    }

    return collections.machines.findOne(filter)
        .then(machine => updateValues(machine))
        .then(values => ({$set: {values}}))
        .then(update => collections.machines.updateOne(filter, update))
}
