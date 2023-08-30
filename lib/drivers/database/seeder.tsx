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
        TransactionType,
        User
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
      await User.deleteMany();

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
      const CLOSE_COMPLETED = 'Close Completed';
      const CLOSE_CANCELED = 'Close Canceled';

      const leaseContract = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Daily',
        termsConditions: 'test',
        state: WORK_IN_PROGRESS,
        startDate: '2023-02-01',
        nextDate: '2023-03-01',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract.save();

      const task = new Task({
        created_at: '2023-02-22',
        leaseContract: leaseContract?._id,
        amount: 43,
        description: 'Task 1',
        state: WORK_IN_PROGRESS,
        taskType: taskType?._id
      });
      await task.save();

      const task2 = new Task({
        created_at: '2023-02-23',
        leaseContract: leaseContract?._id,
        amount: 43,
        description: 'Task 2',
        state: WORK_IN_PROGRESS,
        taskType: taskType?._id
      });
      await task2.save();

      const task3 = new Task({
        created_at: '2022-02-23',
        leaseContract: leaseContract?._id,
        amount: 43,
        description: 'Task 3',
        state: WORK_IN_PROGRESS,
        taskType: taskType?._id
      });
      await task3.save();

      const leaseContract2 = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Daily',
        termsConditions: 'test',
        state: CLOSE_COMPLETED,
        startDate: '2023-01-05',
        nextDate: '2023-02-09',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract2.save();

      const leaseContract3 = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Daily',
        termsConditions: 'test',
        state: CLOSE_CANCELED,
        startDate: '2023-01-01',
        nextDate: '2023-01-04',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract3.save();

      const leaseContract4 = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Daily',
        termsConditions: 'test',
        state: CLOSE_COMPLETED,
        startDate: '2022-01-01',
        nextDate: '2022-01-04',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract4.save();

      const leaseContract5 = new LeaseContract({
        name: 'test',
        description: 'Test',
        timeAmount: 43,
        timeType: 'Monthly',
        termsConditions: 'test',
        state: CLOSE_COMPLETED,
        startDate: '2022-12-01',
        nextDate: '2023-01-01',
        tenant: tenant?._id,
        property: property?._id,
        amount: 43
      });
      await leaseContract5.save();

      console.log('Fake Data sucessfully migrated!'); // eslint-disable-line no-console
      process.exit(0);
    } catch (error) {
      console.log('error'); // eslint-disable-line no-console
      process.exit(1);
    }
  };

  importData();
}
