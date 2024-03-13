import ITransaction from '../entities/ITransaction';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TransactionRepository extends MongooseAbstractRepository<ITransaction> {
  constructor() {
    super('Transaction', 'TraSchema');
  }
}
