import { connectToDB } from '../../../lib/db';
import { hashPassword } from '../../../lib/auth';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input - password should also by at least 7 characters long.',
      });

      return;
    }

    let client;
    try {
      client = await connectToDB();
    } catch (error) {
      console.log('Can not connect to data base');
    }

    const db = client.db();

    const hashedPassword = await hashPassword(password);

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Created user!' });
  }
};

export default handler;
