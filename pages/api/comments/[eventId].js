import { connectionDB, insertDocument, findDocuments } from '../../../helpers/db-util';

export default async function handler(req, res) {
  try {
    const { eventId } = req.query;

    const connection = await connectionDB();

    if (connection.level === 'error') {
      return res.status(500).json({ message: connection.message });
    }
    const { db, client } = connection;

    if (req.method === 'POST') {
      const { email, name, text } = req.body;

      if (!email || !email.includes('@') || !name || name.trim() === '' || !text || text.trim() === '') {
        return res.status(422).json({ message: 'Invalid input.' });
      }
      const newComment = {
        email,
        name,
        text,
        eventId: !eventId || eventId === 'undefined' ? email : eventId
      };

      const result = await insertDocument(db, 'comments', newComment);

      console.log('result', result);

      newComment.id = result.insertedId;

      client.close();

      return res.status(201).json({ message: 'Added comment.', comment: newComment });
    } else if (req.method === 'GET') {
      const comments = await findDocuments(db, 'comments', { eventId }, { _id: -1 });
      console.log('comments', comments);
      client.close();

      return res.status(200).json({ comments });
    }
  } catch (err) {
    console.error('err', err);
    return res.status(400).json({ message: 'Something unexpected happened.' });
  }
}
