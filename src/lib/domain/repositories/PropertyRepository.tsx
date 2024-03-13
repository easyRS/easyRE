import IProperty from '../entities/IProperty';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class PropertyRepository extends MongooseAbstractRepository<IProperty> {
  constructor() {
    super('Property', 'PSchema');
  }
}
