import ILeaseContract from '../../domain/entities/ILeaseContract';
import { TIME_TYPE_DAILY_OPTION } from '../../domain/entities/TimeType';
import LeaseContractRepository from '../../domain/repositories/LeaseContractRepository';
import { disconnect } from '../../drivers/database/conn';
import {
  fakePropertySeeder,
  fakeTenantSeeder
} from '../../drivers/database/seeder';
import LeaseContractUseCases from '../../useCases/LeaseContractUseCases';
import { getNowDate } from '../../utils/datesHelper';
// docker exec main yarn test
describe('lease should be created', () => {
  afterAll(async () => {
    await disconnect();
  });

  it('should not save without name', async () => {
    const leaseContractRepository = new LeaseContractRepository();

    const now = getNowDate();
    const property = await fakePropertySeeder();
    const tenant = await fakeTenantSeeder();

    const workInProgressState =
      leaseContractRepository.getWorkInProgressState();

    const ileaseContract: ILeaseContract = {
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

    const leaseContractUseCases = new LeaseContractUseCases();

    let error;
    let lease: NewLeaseContract;
    try {
      const rawArray = [{ ...tenant }, { ...property }, { ...ileaseContract }];
      const unknownObj = rawArray as unknown;
      const paramObj = unknownObj as Record<string, unknown>;
      lease = await leaseContractUseCases.create(paramObj);

      expect(lease._id).toBeDefined();
    } catch (e) {
      error = e;
    }
    expect(error).toBeUndefined();
  });
});

export {};
