const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://yystephan:AI18dRYE5o7Z9he8@yykido.9xocqky.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function connect() {
  try {
    await client.connect();
    db = client.db('test');
    console.log('You successfully connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }
}

function getDb() {
  return db;
}

module.exports = {
  connect,
  getDb,
};