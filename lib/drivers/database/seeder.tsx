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
        Tenant,
        Transaction,
        TransactionType
      } = await builder();
      // delete ALL data
      await Task.deleteMany();
      await LeaseContract.deleteMany();
      await TaskType.deleteMany();
      await ContractDefinition.deleteMany();
      await Tenant.deleteMany();
      await Property.deleteMany();
      await TransactionType.deleteMany();
      await Transaction.deleteMany();

      // Seed fake data
      const transactionType = new TransactionType(all.transactionType);
      await transactionType.save();
      await Property.insertMany(all.properties);
      await TaskType.insertMany(all.taskTypes);

      const property = await Property.findOne().exec();
      const taskType = await TaskType.findOne().exec();

      const tenant = new Tenant({
        name: 'test',
        phone: 2323,
        notes: 'hey there'
      });
      await tenant.save();
      const WORK_IN_PROGRESS = 'Work In Progress';

      const leaseContract = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Daily',
        termsConditions: 'test',
        state: WORK_IN_PROGRESS,
        startDate: '2023-01-01',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract.save();

      const task = new Task({
        created_at: '2022-01-01',
        leaseContract: leaseContract?._id,
        amount: 43,
        description: 'Test 2',
        state: WORK_IN_PROGRESS,
        taskType: taskType?._id
      });
      await task.save();

      const task2 = new Task({
        created_at: '2023-02-11',
        leaseContract: leaseContract?._id,
        amount: 43,
        description: 'Test 2',
        state: WORK_IN_PROGRESS,
        taskType: taskType?._id
      });
      await task2.save();

      console.log('Fake Data sucessfully migrated!'); // eslint-disable-line no-console
      process.exit(0);
    } catch (error) {
      console.log('error'); // eslint-disable-line no-console
      process.exit(1);
    }
  };

  importData();
}
