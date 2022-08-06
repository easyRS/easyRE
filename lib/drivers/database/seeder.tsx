import builder from './builder';
import { connect } from './conn';
import all from './fakeData';

export default async function executeSeeder() {
  (async function makeConnection() {
    await connect();
  })();

  const importData = async () => {
    try {
      const { Property } = await builder();
      // delete ALL data
      await Property.deleteMany();

      // Seed fake data
      await Property.insertMany(all.properties);

      console.log('Fake Data sucessfully migrated!'); // eslint-disable-line no-console
    } catch (error) {
      console.log('error'); // eslint-disable-line no-console
      process.exit(1);
    }
  };

  importData();
}
