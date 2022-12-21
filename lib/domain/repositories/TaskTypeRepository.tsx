import ITaskType from '../entities/ITaskType';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TaskTypeRepository extends MongooseAbstractRepository<ITaskType> {
  constructor() {
    super('TaskType', 'TTSchema');
  }
}
