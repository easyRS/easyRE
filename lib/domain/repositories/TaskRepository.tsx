import ITask from '../entities/ITask';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TaskRepository extends MongooseAbstractRepository<ITask> {
  constructor() {
    super('Task', 'TskSchema');
  }

  async getKeys(): Promise<ModelKeys> {
    return super.getKeys(['leaseContract', 'taskType', 'property']);
  }

  async list(): Promise<ITask[]> {
    const query = await super.list(['leaseContract', 'taskType', 'property']);
    return query.map((obj: any /* eslint-disable-line*/) => {
      let task = {
        ...obj,
        created_at: obj.created_at ? obj.created_at.toLocaleString() : '',
        taskType: obj.taskType.name
      };

      if (obj.property)
        task = {
          ...task,
          property: { ...obj.property, _id: obj.property._id.toString() }
        };

      if (obj.leaseContract)
        task = {
          ...task,
          leaseContract: {
            ...obj.leaseContract,
            startDate: obj.startDate ? obj.startDate.toLocaleString() : '',
            nextDate: obj.nextDate ? obj.nextDate.toLocaleString() : '',
            _id: obj.leaseContract._id.toString(),
            property: obj.property ? obj.property.toString() : null,
            tenant: obj.tenant ? obj.tenant.toString() : null
          }
        };
      return task;
    });
  }
}
