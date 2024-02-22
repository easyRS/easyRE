import mongoose, { Mongoose } from 'mongoose';
import builder, { SchemaType } from './builder';
import deleteAllData from './deleteAllData';

type Connection = {
  connection: Mongoose;
} & SchemaType;

export const connect = async (): Promise<Connection> => {
  let connection: Mongoose;
  try {
    const { DATABASE_URL, TEST_ENABLED } = process.env;
    if (!DATABASE_URL) throw new Error('DATABASE_URL param is empty');

    const databaseUrl = TEST_ENABLED ? `${DATABASE_URL}test` : DATABASE_URL;

    connection = await mongoose.connect(databaseUrl);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    throw new Error('Cannot cannot to DB');
  }
  const models = await builder();

  return { connection, ...models };
};

export const disconnect = async () => {
  const { TEST_ENABLED } = process.env;
  if (!TEST_ENABLED) await deleteAllData();
  await mongoose.connection.close();
};
