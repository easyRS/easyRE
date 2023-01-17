import mongoose, { Mongoose } from 'mongoose';
import builder, { SchemaType } from './builder';

type Connection = {
  connection: Mongoose;
} & SchemaType;

export const connect = async (): Promise<Connection> => {
  const { DATABASE_URL } = process.env;
  let connection: Mongoose;

  try {
    connection = await mongoose.connect(DATABASE_URL);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    throw new Error('Cannot cannot to DB');
  }

  console.log('Mongoose Connection Established'); // eslint-disable-line no-console

  const models = await builder();

  return { connection, ...models };
};
