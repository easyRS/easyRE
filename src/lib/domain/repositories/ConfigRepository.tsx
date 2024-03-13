import IConfig from '../entities/IConfig';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class ConfigRepository extends MongooseAbstractRepository<IConfig> {
  constructor() {
    super('Config', 'ConfSchema');
  }
}
