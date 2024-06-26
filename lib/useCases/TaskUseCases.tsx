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

export const LEASE = 'Lease';
export const ELECTRICITY = 'Electricity';
export const WATER = 'Water';
export const GAS = 'Gas';
export const MAINTENANCE = 'Maintenance';
export const PAYMENT = 'Payment';

type CreateParams = {
  taskTypeName: string;
  description: string;
  amount: number;
  state?: string;
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
      leaseContract: object.leaseContract as SYS_ID,
      taskType: object.taskType as SYS_ID,
      property: object.taskType as SYS_ID
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
      )?.phone;

      return {
        ...task,
        actions: `whatsapp=${whatsappAction}`
      } as ITask | IAction;
    }
    return task;
  }

  async createdLastTwoWeeks(): Promise<ITask[] | IAction[]> {
    const tasks = await (
      this.repository as TaskRepository
    ).createdLastTwoWeeks();
    return tasks.map(this.addActionToTasks) as ITask[] | IAction[];
  }

  async createdBeforeTwoWeeks(): Promise<ITask[] | IAction[]> {
    const tasks = await (
      this.repository as TaskRepository
    ).createdBeforeTwoWeeks();
    return tasks.map(this.addActionToTasks) as ITask[] | IAction[];
  }

  async listAllWorkInProgress(): Promise<ITask[] | IAction[]> {
    const tasks = await (
      this.repository as TaskRepository
    ).listAllWorkInProgress();
    return tasks.map(this.addActionToTasks) as ITask[] | IAction[];
  }

  async listAllCompleted(): Promise<ITask[] | IAction[]> {
    const tasks = await (this.repository as TaskRepository).listAllCompleted();
    return tasks.map(this.addActionToTasks) as ITask[] | IAction[];
  }

  async listLeaseTasks(leaseContractId: SYS_ID): Promise<ITask[]> {
    const query = { leaseContract: leaseContractId };
    return this.repository.list(
      [
        {
          path: 'taskType'
        }
      ],
      query
    );
  }

  async _create(createParam: CreateParams): Promise<ITask> {
    const taskTypeUseCases = new TaskTypeUseCases();
    const { taskTypeName, leaseContract, property, description, amount } =
      createParam;
    const taskType = (await taskTypeUseCases.findByQuery({
      name: taskTypeName
    })) as ITaskType;
    if (!taskType) throw new Error('TaskType not found');
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

    if (task.state) {
      task = {
        ...task,
        state: task.state
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
      description: `${tenant.name} owes ${amount} in rent.`,
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
      description: `${tenant.name} has an outstanding electricity bill`,
      leaseContract
    };

    return this._create(createParam);
  }

  async /* eslint-disable-line*/ createGenericTask(
    object: Record<string, unknown>
  ): Promise<ITask> {
    const unknownObj = object as unknown;
    const taskObj = unknownObj as ITask;

    const createParam: CreateParams = {
      amount: taskObj.amount,
      description: taskObj.description,
      taskTypeName: PAYMENT
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
      description: `${tenant.name} has an outstanding gas bill`,
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
      description: `${tenant.name} has an outstanding water consumption bill`,
      leaseContract
    };

    return this._create(createParam);
  }

  async findByIdUserFriendly(_id: string): Promise<ITask> {
    return (this.repository as TaskRepository).findByIdUserFriendly(_id);
  }

  async _createMaintenanceTask(property: IProperty): Promise<ITask> {
    const createParam: CreateParams = {
      taskTypeName: MAINTENANCE,
      amount: 0,
      description: `${property.name} needs maintenance`,
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
      await super.remove(object);
    }
  }

  async update(object: Record<string, unknown>): Promise<ITask> {
    /* eslint-disable */
    const {
      taskType: removetaskType,
      property: removeproperty,
      leaseContract: removeleaseContract,
      ...newObj
    } = object;
    /* eslint-disable */

    const updatedTask = await super.update(newObj);
    const unknownVar = newObj as unknown;
    const task = unknownVar as ITask;
    const { state } = task;
    const closeCompleted = (
      this.repository as TaskRepository
    ).getCloseCompletedState();

    if (task._id && state === closeCompleted) {
      const transactionTypeUseCases = new TransactionTypeUseCases();
      const transactionType = await transactionTypeUseCases.findByQuery({});

      if (transactionType && transactionType._id) {
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
    return updatedTask;
  }
}
