import ITransactionType from '../entities/ITransactionType';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TransactionTypeRepository extends MongooseAbstractRepository<ITransactionType> {
  constructor() {
    super('TransactionType', 'TraTSchema');
  }
}
