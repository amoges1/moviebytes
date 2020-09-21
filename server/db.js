const config = require('config');
const uri = config.get('mongoURI')
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGODB_URI || uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true     
});

module.exports = client;

