import { Types } from 'mongoose';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITask from '../domain/entities/ITask';
import ITaskType from '../domain/entities/ITaskType';
import ITenant from '../domain/entities/ITenant';
import TaskRepository from '../domain/repositories/TaskRepository';
import AbstractUseCases from './AbstractUseCases';
import TaskTypeUseCases from './TaskTypeUseCases';

// TODO: export this in a ENV file.
const LEASE = 'Alquiler';
const ELECTRICITY = 'Electricidad';
const WATER = 'Agua';
const GAS = 'Gas';
const MAINTENANCE = 'Mantenimiento';

type CreateParams = {
  taskTypeName: string;
  description: string;
  leaseContract?: ILeaseContract;
  property?: IProperty;
};
export default class TaskUseCases extends AbstractUseCases<
  ITask,
  TaskRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): TaskRepository {
    return new TaskRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ITask {
    return {
      created_at: object.created_at as string,
      description: object.description as string,
      leaseContract: object.leaseContract as Types.ObjectId,
      taskType: object.taskType as Types.ObjectId,
      property: object.taskType as Types.ObjectId
    };
  }

  async _create(createParam: CreateParams): Promise<ITask> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDay();
    const taskTypeUseCases = new TaskTypeUseCases();
    const { taskTypeName, leaseContract, property, description } = createParam;

    const taskType = (await taskTypeUseCases.findByQuery({
      name: taskTypeName
    })) as ITaskType;

    let task: Record<string, unknown> = {
      created_at: `${year}-${month}-${day}`,
      description
    };

    if (taskType._id) {
      task = {
        ...task,
        taskType: taskType._id
      };
    }

    if (leaseContract && leaseContract._id) {
      task = {
        ...task,
        leaseContract: leaseContract._id
      };
    }

    if (property && property._id) {
      task = {
        ...task,
        property: property._id
      };
    }

    return this.create(task);
  }

  async _createLeaseTask(
    leaseContract: ILeaseContract,
    tenant: ITenant
  ): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: LEASE,
      description: `${tenant.name} debe ${leaseContract.amount}bs de alquiler`,
      leaseContract
    };

    return this._create(createParam);
  }

  async _createElectricityTask(
    leaseContract: ILeaseContract,
    tenant: ITenant
  ): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: ELECTRICITY,
      description: `${tenant.name} debe electricidad`,
      leaseContract
    };

    return this._create(createParam);
  }

  async _createGasTask(
    leaseContract: ILeaseContract,
    tenant: ITenant
  ): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: GAS,
      description: `${tenant.name} debe gas`,
      leaseContract
    };

    return this._create(createParam);
  }

  async _createWaterTask(
    leaseContract: ILeaseContract,
    tenant: ITenant
  ): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: WATER,
      description: `${tenant.name} debe agua`,
      leaseContract
    };

    return this._create(createParam);
  }

  async _createMaintenanceTask(property: IProperty): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: MAINTENANCE,
      description: `${property.name} necesita mantenimiento`,
      property
    };

    return this._create(createParam);
  }
  /*
    build:
      https://refactoring.guru/design-patterns/builder/typescript/example
      * When a lease is created: create a group of tasks: create taks for: leasing, water, gas, electricity
      * Every night create a group of tasks: create taks for: leasing, water, gas, electricity 
      * Create a task that can be associated to a property
  */
}
