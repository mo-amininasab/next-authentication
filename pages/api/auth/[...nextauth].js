import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { verifyPassword } from '../../../lib/auth';
import { connectToDB } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      credentials: {
        async authorize(credentials) {
          //? confused
          const client = await connectToDB();

          const usersCollection = client.db().collection('users');
          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            client.close();
            throw new Error('No user Found'); // redirect to login page automatically.
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );
          if (!isValid) {
            client.close();
            throw new Error('Could not log you in!');
          }

          client.close();

          // by returning this obj, Next-auth know that authorization seceded. and encoded to JWT.
          return { email: user.email };
        },
      },
    }),
  ],
}); //! returns a handler Fn.
