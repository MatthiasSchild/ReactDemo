import dotenv from 'dotenv'
import mqtt from 'mqtt';

dotenv.config()

const mqtt_host = process.env.MQTT_HOST
const mqtt_user = process.env.MQTT_USER
const mqtt_pass = process.env.MQTT_PASS

const client = mqtt.connect(mqtt_host, {username: mqtt_user, password: mqtt_pass})
const subscriptionCallbacks = {} // topic: callback

client.on('message', (topic, message) => {
    const callback = subscriptionCallbacks[topic]
    if (callback) {
        const value = JSON.parse(message)
        callback(value)
    }
})

export function sendMessage(topic, message) {
    message = JSON.stringify(message)
    client.publish(topic, message)
}

export function recvMessage(topic, callback) {
    client.subscribe(topic)
    subscriptionCallbacks[topic] = callback
}
