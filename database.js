const { MongoClient } = require('mongodb');
const {DB_USER, DB_PASS} = require("./config.js")
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.iph1sjm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

let database;

async function mongoConnect(callback) {
  try {
    const client = await MongoClient.connect(uri);
    database = client.db('shop');
    console.log('Connection to the database has been established.');
    callback();
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
  }
}

function getDatabase() {
  if (!database) {
    throw new Error('Database not initialized. Call mongoConnect first.');
  }
  return database;
}

module.exports = {
  mongoConnect,
  getDatabase
};