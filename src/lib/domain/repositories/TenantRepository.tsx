import ITenant from '../entities/ITenant';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TenantRepository extends MongooseAbstractRepository<ITenant> {
  constructor() {
    super('Tenant', 'TSchema');
  }
}
