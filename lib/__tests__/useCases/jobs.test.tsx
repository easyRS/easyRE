import ILeaseContract from '../../domain/entities/ILeaseContract';
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
import startMidnightDailyJob from '../../drivers/jobs/tasks';
import LeaseContractUseCases from '../../useCases/LeaseContractUseCases';
import TaskUseCases from '../../useCases/TaskUseCases';
import { daysBetween, monthsBetween } from '../../utils/datesHelper';
// docker exec main yarn test

let ileaseContract: ILeaseContract;
let leaseContractRepository: LeaseContractRepository;
let leaseContractUseCases: LeaseContractUseCases;
let tenant: ITenant;
let property: IProperty;
const startDateTask = '2023-01-01';

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

  property = await fakePropertySeeder();
  tenant = await fakeTenantSeeder();

  ileaseContract = {
    name: 'test',
    description: 'test',
    startDate: startDateTask,
    property,
    tenant,
    amount: 5,
    timeAmount: '5',
    termsConditions: 'test test test',
    timeType: TIME_TYPE_DAILY_OPTION,
    state: workInProgressState
  };
});

describe('Daily midnight tasks creation', () => {
  it('Midnight daily lease execution should move forward one day', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      ileaseContract = {
        ...ileaseContract,
        timeType: TIME_TYPE_DAILY_OPTION,
        startDate: startDateTask
      };
      const paramObj = buildLeaseObj(tenant, property, ileaseContract);

      lease = await leaseContractUseCases.create(paramObj);
      const { nextDate: oldNextDateObj } = lease;
      if (!oldNextDateObj) throw new Error('Old Next Date is undefined');

      const leases = await startMidnightDailyJob();
      let nextDateNew: string | Date | undefined;
      leases.forEach((leaseObj) => {
        if (leaseObj._id && lease._id) nextDateNew = leaseObj.nextDate;
      });
      if (!nextDateNew) throw new Error('New Next Date is undefined');

      const days = daysBetween(new Date(oldNextDateObj), new Date(nextDateNew));
      const ONE_DAY = 1;
      expect(lease._id).toBeDefined();
      expect(days).toBe(ONE_DAY);
    } catch (e) {
      console.log(e); /* eslint-disable-line*/
      error = e;
    }
    expect(error).toBeUndefined();
  });

  it('Midnight monthly lease execution should move forward one month', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      ileaseContract = {
        ...ileaseContract,
        timeType: TIME_TYPE_MONTHLY_OPTION,
        startDate: startDateTask
      };
      const paramObj = buildLeaseObj(tenant, property, ileaseContract);

      lease = await leaseContractUseCases.create(paramObj);
      const { nextDate: oldNextDateObj } = lease;
      if (!oldNextDateObj) throw new Error('Old Next Date is undefined');

      const leases = await startMidnightDailyJob();
      let nextDateNew: string | Date | undefined;
      leases.forEach((leaseObj) => {
        if (leaseObj._id && lease._id) nextDateNew = leaseObj.nextDate;
      });
      if (!nextDateNew) throw new Error('New Next Date is undefined');

      const months = monthsBetween(
        new Date(oldNextDateObj),
        new Date(nextDateNew)
      );

      const ONE_MONTH = 1;
      expect(lease._id).toBeDefined();
      expect(months).toBe(ONE_MONTH);
    } catch (e) {
      console.log(e); /* eslint-disable-line*/
      error = e;
    }
    expect(error).toBeUndefined();
  });
});

export {};
