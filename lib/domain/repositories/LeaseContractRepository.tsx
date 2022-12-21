import ILeaseContract from '../entities/ILeaseContract';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class LeaseContractRepository extends MongooseAbstractRepository<ILeaseContract> {
  constructor() {
    super('LeaseContract', 'LCSchema');
  }

  async getKeys(): Promise<ModelKeys> {
    return super.getKeys(['property', 'tenant']);
  }

  async list(): Promise<ILeaseContract[]> {
    const query = await super.list(['property', 'tenant']);
    return query.map((obj: any /* eslint-disable-line*/) => {
      return {
        ...obj,
        startDate: obj.startDate ? obj.startDate.toLocaleString() : '',
        property: { ...obj.property, _id: obj.property._id.toString() },
        tenant: { ...obj.tenant, _id: obj.tenant._id.toString() }
      };
    });
  }
}
