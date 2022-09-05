import IContractDefinition from '../entities/IContractDefinition';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class ContractDefRepository extends MongooseAbstractRepository<IContractDefinition> {
  constructor() {
    super('ContractDefinition', 'CSchema');
  }
}
