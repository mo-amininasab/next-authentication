import { MongoClient } from 'mongodb';

export const connectToDB = async () => {
  const client = await MongoClient.connect(
    'mongodb+srv://mohammad:b7UpEq1WlYMFvcjU@cluster0.lzo9m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  );

  return client;
};
