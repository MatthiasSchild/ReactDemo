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

export default collections
