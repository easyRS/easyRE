import ILeaseContract from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITenant from '../../domain/entities/ITenant';
import { TIME_TYPE_DAILY_OPTION } from '../../domain/entities/TimeType';
import LeaseContractRepository from '../../domain/repositories/LeaseContractRepository';
import { disconnect } from '../../drivers/database/conn';
import {
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
import { getNowDate } from '../../utils/datesHelper';
// docker exec main yarn test

let ileaseContract: ILeaseContract;
let leaseContractRepository: LeaseContractRepository;
let leaseContractUseCases: LeaseContractUseCases;
let taskUseCases: TaskUseCases;
let tenant: ITenant;
let property: IProperty;

beforeEach(async () => {
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

describe('lease should be created', () => {
  afterAll(async () => {
    await disconnect();
  });

  it('LeaseContract with its tasks created sucessfully', async () => {
    let error;
    let lease: NewLeaseContract;
    try {
      const rawArray = [{ ...tenant }, { ...property }, { ...ileaseContract }];
      const unknownObj = rawArray as unknown;
      const paramObj = unknownObj as Record<string, unknown>;

      lease = await leaseContractUseCases.create(paramObj);

      if (!lease || !lease._id) throw new Error('Lease was not created');
      const tasks = await taskUseCases.listLeaseTasks(lease._id);

      const taskTypes = [LEASE, ELECTRICITY, WATER, GAS];
      const tasksWereCreated = tasks.filter((task) =>
        taskTypes.includes(task.taskType as string)
      );

      expect(lease._id).toBeDefined();
      expect(tasksWereCreated.length).toBe(taskTypes.length);
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
  });
});

export {};
