import ILeaseContract from '../entities/ILeaseContract';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class LeaseContractRepository extends MongooseAbstractRepository<ILeaseContract> {
  constructor() {
    super('LeaseContract', 'LCSchema');
  }

  async list(): Promise<ILeaseContract[]> {
    const query = await super.list();

    return query.map((obj: any /* eslint-disable-line*/) => {
      // TODO: fetch property and tenant as well
      return {
        ...obj,
        property: obj.property.toString(),
        tenant: obj.tenant.toString()
      };
    });
  }
}
