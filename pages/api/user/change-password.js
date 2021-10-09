// ! can use getSession in server-side.
import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDB } from '../../../lib/db';

const handler = async (req, res) => {
  if (req.method !== 'PATCH') {
    return;
  }

  const session = await getSession({ req: req });

  // this if-check, protect api from unauthorized requests.
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });

    return;
  }

  const userEmail = session.use.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDB();
  const usersCollection = client.db().collection('users');
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: 'User not found!' });

    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    // means user is authenticated, but is not authorized to do this action.
    // can use 422 instead. means user mistyped.
    res.status(403).json({ message: 'Invalid password.' });

    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  client.close();
  res.status(200).json({ message: 'Password updated!' });
};

export default handler;
