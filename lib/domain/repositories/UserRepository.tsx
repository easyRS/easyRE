import IUser from '../entities/IUser';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class UserRepository extends MongooseAbstractRepository<IUser> {
  constructor() {
    super('User', 'USchema');
  }
}
