const { connect, connection } = require('mongoose');

const database = 'socialDB';

//mongodb://127.0.0.1:27017/socialDB
const connectionString = process.env.MONGODB_URI || `mongodb://127.0.0.1:27017/${database}`;

connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection;