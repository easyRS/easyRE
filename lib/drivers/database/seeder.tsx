import builder from './builder';
import { connect } from './conn';
import all from './fakeData';

export default async function executeSeeder() {
  (async function makeConnection() {
    await connect();
  })();

  const importData = async () => {
    // docker exec main yarn run seed
    try {
      const {
        Task,
        LeaseContract,
        Property,
        TaskType,
        ContractDefinition,
        Tenant
      } = await builder();
      // delete ALL data
      await Task.deleteMany();
      await LeaseContract.deleteMany();
      await TaskType.deleteMany();
      await ContractDefinition.deleteMany();
      await Tenant.deleteMany();
      await Property.deleteMany();

      // Seed fake data
      await Property.insertMany(all.properties);
      await TaskType.insertMany(all.taskTypes);

      console.log('Fake Data sucessfully migrated!'); // eslint-disable-line no-console
    } catch (error) {
      console.log('error'); // eslint-disable-line no-console
      process.exit(1);
    }
  };

  importData();
}
