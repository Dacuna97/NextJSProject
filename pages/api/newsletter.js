import { connectionDB, insertDocument } from '../../helpers/db-util';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const userEmail = req.body.email;

      if (!userEmail || !userEmail.includes('@')) {
        return res.status(422).json({ message: 'Invalid email address.' });
      }

      console.log(userEmail);
      const connection = await connectionDB();

      if (connection.level === 'error') {
        return res.status(500).json({ message: connection.message });
      }
      const { db, client } = connection;

      await insertDocument(db, 'newsletter', { email: userEmail });

      client.close();

      return res.status(201).json({ message: 'Signed up!' });
    }
  } catch (err) {
    console.error('err', err);
    return res.status(400).json({ message: 'Something unexpected happened.' });
  }
}
