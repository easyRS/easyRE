import ILeaseContract, {
  LEASE_CLOSE_COMPLETED_STATE,
  LEASE_WORK_IN_PROGRESS_STATE
} from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITask, {
  TASK_WORK_IN_PROGRESS_STATE
} from '../../domain/entities/ITask';
import ITenant from '../../domain/entities/ITenant';
import LeaseContractRepository from '../../domain/repositories/LeaseContractRepository';
import PropertyRepository from '../../domain/repositories/PropertyRepository';
import TaskRepository from '../../domain/repositories/TaskRepository';
import TenantRepository from '../../domain/repositories/TenantRepository';
import TaskTypeUseCases from '../../useCases/TaskTypeUseCases';
import TransactionTypeUseCases from '../../useCases/TransactionTypeUseCases';
import builder from './builder';
import { connect } from './conn';
import deleteAllData from './deleteAllData';
import all from './fakeData';

export const fakeTenantSeeder = async (): Promise<ITenant> => {
  const tenantRepository = new TenantRepository();
  const tenant: ITenant = {
    name: 'test',
    email: 'testtenant@example.com',
    phone: '2323',
    notes: 'hey there'
  };

  return tenantRepository.create(tenant);
};

export const fakePropertySeeder = async (): Promise<IProperty> => {
  const propertyRepository = new PropertyRepository();
  const property: IProperty = {
    amount: 1,
    coordinates: [42, 4],
    measure: 'measure 1',
    name: 'name 1',
    location_details: 'location_details 1',
    description: 'this is a long description 1'
  };

  return propertyRepository.create(property);
};

export const fakeLeaseContractSeeder = async (
  property: IProperty,
  tenant: ITenant
): Promise<ILeaseContract> => {
  if (!tenant || !property || !tenant._id || !property._id)
    throw new Error('Tenant or Property cannot be null');
  const leaseContractRepository = new LeaseContractRepository();

  return leaseContractRepository.create({
    name: 'test',
    description: 'Test',
    timeAmount: '43',
    timeType: 'Daily',
    termsConditions: 'test',
    state: LEASE_WORK_IN_PROGRESS_STATE,
    startDate: '2023-02-01',
    nextDate: '2023-03-01',
    tenant: tenant._id,
    property: property._id,
    amount: 43
  });
};

export const fakeTaskSeeder = async (
  leaseContract: ILeaseContract
): Promise<ITask> => {
  const { TaskType } = await builder();
  const taskType = await TaskType.findOne().exec();
  const taskTypeRepository = new TaskRepository();

  if (!taskType || !taskType._id) throw new Error('TYPE ID cannot be null');
  return taskTypeRepository.create({
    created_at: '2024-01-25',
    leaseContract: leaseContract?._id,
    amount: 43,
    description: 'Task 1',
    state: TASK_WORK_IN_PROGRESS_STATE,
    taskType: taskType?._id
  });
};

export const fakeDataFunct = async () => {
  const { Task, LeaseContract, Property, TaskType } = await builder();
  await Property.insertMany(all.properties);

  const taskType = await TaskType.findOne().exec();

  const property: IProperty = await fakePropertySeeder();
  const tenant: ITenant = await fakeTenantSeeder();

  const leaseContract = await fakeLeaseContractSeeder(property, tenant);

  await fakeTaskSeeder(leaseContract);

  const task2 = new Task({
    created_at: '2024-01-23',
    leaseContract: leaseContract?._id,
    amount: 43,
    description: 'Task 2',
    state: TASK_WORK_IN_PROGRESS_STATE,
    taskType: taskType?._id
  });
  await task2.save();

  const task3 = new Task({
    created_at: '2024-01-17',
    leaseContract: leaseContract?._id,
    amount: 43,
    description: 'Task 3',
    state: TASK_WORK_IN_PROGRESS_STATE,
    taskType: taskType?._id
  });
  await task3.save();

  const task4 = new Task({
    created_at: '2023-8-17',
    leaseContract: leaseContract?._id,
    amount: 43,
    description: 'Task 4',
    state: TASK_WORK_IN_PROGRESS_STATE,
    taskType: taskType?._id
  });
  await task4.save();

  const leaseContract2 = new LeaseContract({
    name: 'test',
    description: 'Test',
    timeAmount: 43,
    timeType: 'Daily',
    termsConditions: 'test',
    state: LEASE_CLOSE_COMPLETED_STATE,
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
    state: LEASE_CLOSE_COMPLETED_STATE,
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
    state: LEASE_CLOSE_COMPLETED_STATE,
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
    state: LEASE_CLOSE_COMPLETED_STATE,
    startDate: '2022-12-01',
    nextDate: '2023-01-01',
    tenant: tenant?._id,
    property: property?._id,
    amount: 43
  });
  await leaseContract5.save();
};

export default async function executeSeeder(
  seedFakeData: boolean,
  deleteData: boolean,
  seedTypes: boolean
) {
  (async function makeConnection() {
    await connect();
  })();

  const importData = async () => {
    // docker exec main yarn run seed
    const { TEST_ENABLED } = process.env;
    try {
      const { TaskType, TransactionType } = await builder();

      if (deleteData) {
        await deleteAllData();
      }

      if (seedTypes) {
        const tasktypeUseCases = new TaskTypeUseCases();
        const taskTypeList = await tasktypeUseCases.list();

        if (taskTypeList.length === 0) {
          await TaskType.insertMany(all.taskTypes);
        } else {
          console.log('TaskTypes were already set !!!'); // eslint-disable-line no-console
        }

        const transactionTypeUseCases = new TransactionTypeUseCases();
        const transactionTypeList = await transactionTypeUseCases.list();

        if (transactionTypeList.length === 0) {
          const transactionType = new TransactionType(all.transactionType);
          await transactionType.save();
        } else {
          console.log('TransactionTypes were already set !!!'); // eslint-disable-line no-console
        }
      }

      if (seedFakeData) {
        await fakeDataFunct();
      }

      console.log(`Seed sucessfully ran! TEST_ENABLED=${TEST_ENABLED}`); // eslint-disable-line no-console

      if (TEST_ENABLED && TEST_ENABLED === 'false') process.exit(0);
    } catch (error) {
      console.log('error'); // eslint-disable-line no-console
      console.log(error); // eslint-disable-line no-console
      if (!TEST_ENABLED) process.exit(1);
    }
  };

  importData();
}
