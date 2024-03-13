import IUser from '../entities/IUser';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class UserRepository extends MongooseAbstractRepository<IUser> {
  constructor() {
    super('User', 'USchema');
  }

  async findOneAndUpdate(_id: string, userUpdatesObj: IUser): Promise<IUser> {
    const oldObj = await super.findByQuery({});
    if (!oldObj) throw new Error('User cannot be null');

    if (oldObj && oldObj._id)
      return super.findOneAndUpdate(
        _id.toString(),
        {
          ...oldObj,
          ...userUpdatesObj
        },
        true
      );
    return oldObj;
  }
}
