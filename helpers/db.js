import { MongoClient } from 'mongodb';

export default async function connectionDB() {
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
