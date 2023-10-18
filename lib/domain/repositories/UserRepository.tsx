import IUser from '../entities/IUser';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class UserRepository extends MongooseAbstractRepository<IUser> {
  constructor() {
    super('User', 'USchema');
  }

  async findOneAndUpdate(_id: string, userUpdatesObj: IUser): Promise<void> {
    const oldObj = await super.findByQuery({});
    if (oldObj._id)
      super.findOneAndUpdate(_id.toString(), {
        ...oldObj,
        ...userUpdatesObj
      });
  }
}
