import { MongoClient } from 'mongodb';

export async function connectionDB() {
  try {
    const client = await MongoClient.connect(
      'mongodb+srv://dacuna97:dacuna97@cluster0.e8pc8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
    );

    const db = client.db();
    return { db, client };
  } catch (err) {
    console.error('error connection to database', err);
    return { level: 'error', message: 'connection to database error' };
  }
}

export async function insertDocument(db, collection, document) {
  const response = await db.collection(collection).insertOne(document);
  return response;
}

export async function findDocuments(db, collection, filters = {}, sort = {}) {
  const response = await db.collection(collection).find(filters).sort(sort).toArray();
  return response;
}
