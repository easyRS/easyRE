import ILeaseContract, {
  LEASE_CLOSE_COMPLETED_STATE,
  LEASE_WORK_IN_PROGRESS_STATE
} from '../entities/ILeaseContract';

import {
  TIME_TYPE_DAILY_OPTION,
  TIME_TYPE_MONTHLY_OPTION
} from '../entities/TimeType';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class LeaseContractRepository extends MongooseAbstractRepository<ILeaseContract> {
  constructor() {
    super('LeaseContract', 'LCSchema');
  }

  async getKeys(forbiddenFields?: string[]): Promise<ModelKeys> {
    return super.getKeys(forbiddenFields);
  }

  /* eslint-disable-line class-methods-use-this */ getWorkInProgressState(): string {
    return LEASE_WORK_IN_PROGRESS_STATE;
  }

  /* eslint-disable-line class-methods-use-this */ getCloseCompletedState(): string {
    return LEASE_CLOSE_COMPLETED_STATE;
  }

  /* eslint-disable-line class-methods-use-this */ getDailyOption(): string {
    return TIME_TYPE_DAILY_OPTION;
  }

  /* eslint-disable-line class-methods-use-this */ getMonthlyOption(): string {
    return TIME_TYPE_MONTHLY_OPTION;
  }

  async findOneAndUpdate(id: string, obj: ILeaseContract): Promise<void> {
    const oldObj = await super.findById(id, []);
    const {
      tenant: /* eslint-disable */ removedId,
      property: removedV,
      ...newRet
    } = obj; /* eslint-disable */
    super.findOneAndUpdate(id, { ...oldObj, ...newRet });
  }

  async findById(
    id: string,
    populateValuesParam?: Record<string, unknown>[]
  ): Promise<ILeaseContract> {
    const nameTransform = (doc: any /* eslint-disable-line*/) =>
      doc && doc.name;
    const populateValues = populateValuesParam || [
      {
        path: 'tenant',
        transform: nameTransform
      },
      {
        path: 'property',
        transform: nameTransform
      }
    ];
    const lease = await super.findById(id, populateValues);
    return {
      ...lease,
      startDate: lease.startDate
        ? (lease.startDate as Date).toISOString().split('T')[0]
        : '',
      nextDate: lease.nextDate
        ? (lease.nextDate as Date).toISOString().split('T')[0]
        : ''
    };
  }

  async listWorkInProgress(): Promise<ILeaseContract[]> {
    const workInProgressState = this.getWorkInProgressState();
    const query = { state: workInProgressState };
    return this.list([{ path: 'property' }, { path: 'tenant' }], query);
  }

  async list(
    populateValues: Record<string, unknown>[] = [
      { path: 'property' },
      { path: 'tenant' }
    ],
    query: Record<string, unknown> = {}
  ): Promise<ILeaseContract[]> {
    const listQuery = await super.list(populateValues, query);
    return listQuery.map((obj: any /* eslint-disable-line*/) => {
      return {
        ...obj,
        startDate: obj.startDate ? obj.startDate.toLocaleString() : '',
        nextDate: obj.nextDate ? obj.nextDate.toLocaleString() : '',
        property: { ...obj.property, _id: obj.property._id.toString() },
        tenant: { ...obj.tenant, _id: obj.tenant._id.toString() }
      };
    });
  }
}
