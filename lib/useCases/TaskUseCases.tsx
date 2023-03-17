import { Types } from 'mongoose';
import ILeaseContract from '../domain/entities/ILeaseContract';
import IProperty from '../domain/entities/IProperty';
import ITask from '../domain/entities/ITask';
import ITaskType from '../domain/entities/ITaskType';
import ITenant from '../domain/entities/ITenant';
import TaskRepository from '../domain/repositories/TaskRepository';
import { getNowDate } from '../utils/datesHelper';
import AbstractUseCases from './AbstractUseCases';
import TaskTypeUseCases from './TaskTypeUseCases';
import TransactionTypeUseCases from './TransactionTypeUseCases';
import TransactionUseCases from './TransactionUseCases';

// TODO: export this in a ENV file.
const LEASE = 'Alquiler';
const ELECTRICITY = 'Electricidad';
const WATER = 'Agua';
const GAS = 'Gas';
const MAINTENANCE = 'Mantenimiento';

type CreateParams = {
  taskTypeName: string;
  description: string;
  amount: number;
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
      amount: object.amount as number,
      description: object.description as string,
      state: object.state as string,
      leaseContract: object.leaseContract as Types.ObjectId,
      taskType: object.taskType as Types.ObjectId,
      property: object.taskType as Types.ObjectId
    };
  }

  async listWorkInProgress(): Promise<ITask[]> {
    return (this.repository as TaskRepository).listWorkInProgress();
  }

  /* eslint-disable-line class-methods-use-this */ addActionToTasks(
    task: ITask
  ): ITask | IAction {
    if (task.leaseContract) {
      const leaseContractUnknown = task.leaseContract as unknown;
      const whatsappAction = (
        (leaseContractUnknown as ILeaseContract).tenant as ITenant
      ).phone;

      return {
        ...task,
        actions: `whatsapp=${whatsappAction}`
      } as ITask | IAction;
    }
    return task;
  }

  async createdLastTwoWeeks(): Promise<ITask | IAction[]> {
    const tasks = await (
      this.repository as TaskRepository
    ).createdLastTwoWeeks();
    return tasks.map(this.addActionToTasks) as ITask | IAction[];
  }

  async createdBeforeTwoWeeks(): Promise<ITask | IAction[]> {
    const tasks = await (
      this.repository as TaskRepository
    ).createdBeforeTwoWeeks();
    return tasks.map(this.addActionToTasks) as ITask | IAction[];
  }

  async _create(createParam: CreateParams): Promise<ITask> {
    const taskTypeUseCases = new TaskTypeUseCases();
    const { taskTypeName, leaseContract, property, description, amount } =
      createParam;

    const taskType = (await taskTypeUseCases.findByQuery({
      name: taskTypeName
    })) as ITaskType;
    const workInProgressState = (
      this.repository as TaskRepository
    ).getWorkInProgressState();

    const now = getNowDate();
    let task: Record<string, unknown> = {
      created_at: now,
      state: workInProgressState,
      amount,
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
    tenant: ITenant,
    amount: number
  ): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: LEASE,
      description: `${tenant.name} debe ${amount}bs de alquiler`,
      amount,
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
      amount: 0,
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
      amount: 0,
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
      amount: 0,
      description: `${tenant.name} debe agua`,
      leaseContract
    };

    return this._create(createParam);
  }

  async _createMaintenanceTask(property: IProperty): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: MAINTENANCE,
      amount: 0,
      description: `${property.name} necesita mantenimiento`,
      property
    };

    return this._create(createParam);
  }

  async remove(object: Record<string, unknown>): Promise<void> {
    const unknownVar = object as unknown;
    const task = unknownVar as ITask;
    if (task._id) {
      const transactionUseCase = new TransactionUseCases();
      transactionUseCase.removeByQuery({ task: task._id.toString() });
      super.remove(object);
    }
  }

  async update(object: Record<string, unknown>): Promise<void> {
    /* eslint-disable */
    const {
      taskType: removetaskType,
      property: removeproperty,
      leaseContract: removeleaseContract,
      ...newObj
    } = object;
    /* eslint-disable */

    await super.update(newObj);
    const unknownVar = newObj as unknown;
    const task = unknownVar as ITask;
    const { state } = task;
    const closeCompleted = (
      this.repository as TaskRepository
    ).getCloseCompletedState();

    if (task._id && state === closeCompleted) {
      const transactionTypeUseCases = new TransactionTypeUseCases();
      const transactionType = await transactionTypeUseCases.findByQuery({});

      if (transactionType._id) {
        const now = getNowDate();
        const transactionUseCase = new TransactionUseCases();
        await transactionUseCase.create({
          created_at: now,
          amount: task.amount,
          notes: task.description,
          task: task._id,
          transactionType: transactionType._id
        });
      }
    }
  }
}
