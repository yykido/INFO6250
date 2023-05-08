const { getDb } = require('./database');

async function createUser(user) {
  const db = getDb();
  const result = await db.collection('users').insertOne(user);
  return result.insertedId;
}

module.exports = {
  createUser,
};
