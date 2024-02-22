import ILeaseContract, {
  LEASE_WORK_IN_PROGRESS_STATE
} from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITenant from '../../domain/entities/ITenant';
import {
  TIME_TYPE_DAILY_OPTION,
  TIME_TYPE_MONTHLY_OPTION
} from '../../domain/entities/TimeType';
import LeaseContractRepository from '../../domain/repositories/LeaseContractRepository';
import { disconnect } from '../../drivers/database/conn';
import executeSeeder, {
  fakePropertySeeder,
  fakeTenantSeeder
} from '../../drivers/database/seeder';
import LeaseContractUseCases from '../../useCases/LeaseContractUseCases';
import TaskUseCases, {
  ELECTRICITY,
  GAS,
  LEASE,
  WATER
} from '../../useCases/TaskUseCases';
import {
  daysBetween,
  getNowDate,
  monthsBetween
} from '../../utils/datesHelper';
// docker exec main yarn test

let ileaseContract: ILeaseContract;
let leaseContractRepository: LeaseContractRepository;
let leaseContractUseCases: LeaseContractUseCases;
let taskUseCases: TaskUseCases;
let tenant: ITenant;
let property: IProperty;
const LEASE_NOT_CREATED_MESSAGE = 'Lease was not created';

const buildLeaseObj = (
  tenantParam: ITenant,
  propertyParam: IProperty,
  ileaseContractParam: ILeaseContract
): Record<string, unknown> => {
  const rawArray = [
    { ...tenantParam },
    { ...propertyParam },
    { ...ileaseContractParam }
  ];
  const unknownObj = rawArray as unknown;
  return unknownObj as Record<string, unknown>;
};

beforeAll(async () => {
  const seedFakeData = false;
  const deleteData = false;
  const seedTypes = true;
  await executeSeeder(seedFakeData, deleteData, seedTypes);
});

afterAll(async () => {
  await disconnect();
});

beforeAll(async () => {
  leaseContractRepository = new LeaseContractRepository();
  leaseContractUseCases = new LeaseContractUseCases();
  taskUseCases = new TaskUseCases();

  const workInProgressState = leaseContractRepository.getWorkInProgressState();

  const now = getNowDate();

  property = await fakePropertySeeder();
  tenant = await fakeTenantSeeder();

  ileaseContract = {
    name: 'test',
    description: 'test',
    startDate: now,
    property,
    tenant,
    amount: 5,
    timeAmount: '5',
    termsConditions: 'test test test',
    timeType: TIME_TYPE_DAILY_OPTION,
    state: workInProgressState
  };
});

describe('Lease Contract creation', () => {
  it('LeaseContract with its tasks created sucessfully', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      const paramObj = buildLeaseObj(tenant, property, ileaseContract);
      lease = await leaseContractUseCases.create(paramObj);

      if (!lease || !lease._id) throw new Error(LEASE_NOT_CREATED_MESSAGE);
      const tasks = await taskUseCases.listLeaseTasks(lease._id);

      const taskTypes = [LEASE, ELECTRICITY, WATER, GAS];
      const tasksWereCreated = tasks.filter((task) =>
        taskTypes.includes(task.taskType as string)
      );

      expect(lease._id).toBeDefined();
      expect(lease.state).toBe(LEASE_WORK_IN_PROGRESS_STATE);
      expect(tasksWereCreated.length).toBe(taskTypes.length);
    } catch (e) {
      console.log(e);
      error = e;
    }
    expect(error).toBeUndefined();
  });

  it('Daily LeaseContract created with correct Next Date', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      const now = getNowDate();
      ileaseContract = {
        ...ileaseContract,
        timeType: TIME_TYPE_DAILY_OPTION,
        startDate: now
      };
      const paramObj = buildLeaseObj(tenant, property, ileaseContract);

      lease = await leaseContractUseCases.create(paramObj);
      const { startDate, nextDate } = lease;

      if (!lease || !lease._id) throw new Error(LEASE_NOT_CREATED_MESSAGE);
      if (!nextDate) throw new Error('Next Date should not be null');
      const days = daysBetween(new Date(startDate), new Date(nextDate));
      const ONE_DAY = 1;
      expect(lease._id).toBeDefined();
      expect(days).toBe(ONE_DAY);
    } catch (e) {
      console.log(e);
      error = e;
    }
    expect(error).toBeUndefined();
  });

  it('Monthly LeaseContract created with correct Next Date', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      const now = getNowDate();
      ileaseContract = {
        ...ileaseContract,
        timeType: TIME_TYPE_MONTHLY_OPTION,
        startDate: now
      };
      const paramObj = buildLeaseObj(tenant, property, ileaseContract);

      lease = await leaseContractUseCases.create(paramObj);
      const { startDate, nextDate } = lease;

      if (!lease || !lease._id) throw new Error(LEASE_NOT_CREATED_MESSAGE);
      if (!nextDate) throw new Error('Next Date should not be null');
      const days = monthsBetween(new Date(startDate), new Date(nextDate));
      const ONE_MONTH = 1;
      expect(lease._id).toBeDefined();
      expect(days).toBe(ONE_MONTH);
    } catch (e) {
      console.log(e);
      error = e;
    }
    expect(error).toBeUndefined();
  });
});

export {};
