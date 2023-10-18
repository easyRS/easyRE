import ITask, {
  TASK_CLOSE_COMPLETED_STATE,
  TASK_WORK_IN_PROGRESS_STATE
} from '../entities/ITask';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class TaskRepository extends MongooseAbstractRepository<ITask> {
  constructor() {
    super('Task', 'TskSchema');
  }

  /* eslint-disable-line class-methods-use-this */ getWorkInProgressState(): string {
    return TASK_WORK_IN_PROGRESS_STATE;
  }

  /* eslint-disable-line class-methods-use-this */ getCloseCompletedState(): string {
    return TASK_CLOSE_COMPLETED_STATE;
  }

  async findByIdUserFriendly(id: string): Promise<ITask> {
    const nameTransform = (doc: any /* eslint-disable-line*/) =>
      doc && doc.name;
    const populateValues = [
      {
        path: 'taskType',
        transform: nameTransform
      },
      {
        path: 'leaseContract',
        transform: nameTransform
      },
      {
        path: 'property',
        transform: nameTransform
      }
    ];
    const task = await super.findById(id, populateValues);
    return {
      ...task,
      created_at: task.created_at ? task.created_at.toLocaleString() : ''
    };
  }

  async getKeys(): Promise<ModelKeys> {
    return super.getKeys();
  }

  async listWorkInProgress(): Promise<ITask[]> {
    const workInProgressState = this.getWorkInProgressState();
    const query = {
      state: workInProgressState
    };
    return this.list(
      [
        {
          path: 'leaseContract',
          model: 'LeaseContract',
          populate: {
            path: 'tenant',
            model: 'Tenant'
          }
        },
        { path: 'taskType' },
        { path: 'property' }
      ],
      query
    );
  }

  async createdLastTwoWeeks(): Promise<ITask[]> {
    const workInProgressState = this.getWorkInProgressState();
    const lastTwoWeeks = Date.now() - 14 * 60 * 60 * 24 * 1000;
    const query = {
      state: workInProgressState,
      created_at: {
        $gte: lastTwoWeeks
      }
    };
    return this.list(
      [
        {
          path: 'leaseContract',
          model: 'LeaseContract',
          populate: [
            {
              path: 'tenant',
              model: 'Tenant'
            },
            {
              path: 'property',
              model: 'Property'
            }
          ]
        },
        { path: 'taskType' },
        { path: 'property' }
      ],
      query
    );
  }

  async createdBeforeTwoWeeks(): Promise<ITask[]> {
    const workInProgressState = this.getWorkInProgressState();
    const lastTwoWeeks = Date.now() - 14 * 60 * 60 * 24 * 1000;
    const query = {
      state: workInProgressState,
      created_at: {
        $lt: lastTwoWeeks
      }
    };
    return this.list(
      [
        {
          path: 'leaseContract',
          model: 'LeaseContract',
          populate: [
            {
              path: 'tenant',
              model: 'Tenant'
            },
            {
              path: 'property',
              model: 'Property'
            }
          ]
        },
        { path: 'taskType' },
        { path: 'property' }
      ],
      query
    );
  }

  async list(
    populateValues: Record<string, unknown>[] = [
      { path: 'leaseContract' },
      { path: 'taskType' },
      { path: 'property' }
    ],
    query: Record<string, unknown> = {}
  ): Promise<ITask[]> {
    const result = await super.list(populateValues, query);
    return result.map((obj: any /* eslint-disable-line*/) => {
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
            tenant: obj.leaseContract.tenant
              ? typeof obj.leaseContract.tenant === 'object'
                ? { ...obj.leaseContract.tenant }
                : obj.leaseContract.tenant.toString()
              : null,
            property: obj.leaseContract.property
              ? typeof obj.leaseContract.property === 'object'
                ? { ...obj.leaseContract.property }
                : obj.leaseContract.property.toString()
              : null
          }
        };
      return task;
    });
  }
}
