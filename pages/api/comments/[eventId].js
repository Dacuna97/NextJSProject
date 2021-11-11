import connectionDB from '../../../helpers/db';

export default async function handler(req, res) {
  try {
    const { eventId } = req.query;

    const connection = await connectionDB();

    if (connection.level === 'error') {
      return res.status(400).json({ message: connection.message });
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

      const result = await db.collection('comments').insertOne(newComment);

      console.log(result);

      newComment.id = result.insertedId;

      client.close();

      return res.status(201).json({ message: 'Added comment.', comment: newComment });
    } else if (req.method === 'GET') {
      console.log('event id', eventId);
      const comments = await db.collection('comments').find({ eventId }).sort({ _id: -1 }).toArray();
      console.log('comments', comments);
      client.close();

      return res.status(200).json({ comments });
    }
  } catch (err) {
    console.error('err', err);
    return res.status(400).json({ message: 'Something unexpected happened.' });
  }
}
