const MongoClient = require('mongodb').MongoClient;

let collections = {
    machines: null
}

MongoClient.connect('mongodb://localhost:27017/demo', function (err, db) {
    if (err) {
        throw err;
    }
    collections.machines = db.db('demo').collection('machines')
});

module.exports = collections
