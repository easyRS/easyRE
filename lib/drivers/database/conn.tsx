import mongoose from 'mongoose';
import builder from './builder';

export const connect = async () => {
  const { DATABASE_URL } = process.env;
  const connection = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err)); // eslint-disable-line no-console
  console.log('Mongoose Connection Established'); // eslint-disable-line no-console

  const models = await builder();

  return { connection, ...models };
};
