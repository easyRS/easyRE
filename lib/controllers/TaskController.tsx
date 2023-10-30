import ILeaseContract from '../domain/entities/ILeaseContract';
import ITask from '../domain/entities/ITask';
import { generateGoogleEvent } from '../drivers/network/googleapis';
import LeaseContractUseCases from '../useCases/LeaseContractUseCases';
import TaskUseCases from '../useCases/TaskUseCases';

async function getTableTasks(
  tasks: ITask[] | IAction[]
): Promise<TableMapping<ITaskTable>> {
  const labelsMapping: ITaskTable = {
    created_at: 'Created At',
    taskType: 'Type',
    state: 'State',
    description: 'Description',
    actions: 'Actions'
  };

  return {
    tableName: labelsMapping,
    arrayObj: tasks
  };
}

async function getCurrentTableTasks(): Promise<TableMapping<ITaskTable>> {
  const taskUseCase = new TaskUseCases();
  const tasks = await taskUseCase.createdLastTwoWeeks();
  return getTableTasks(tasks);
}

async function getBeforeTwoTableTasks(): Promise<TableMapping<ITaskTable>> {
  const taskUseCase = new TaskUseCases();
  const tasks = await taskUseCase.createdBeforeTwoWeeks();
  return getTableTasks(tasks);
}

async function getTask(_id: string): Promise<ITask> {
  return new TaskUseCases().findByIdUserFriendly(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new TaskUseCases().getKeys();
  const editables = keys.editables.map((fieldData) => {
    const { name } = fieldData;

    if (name === 'state') {
      return {
        ...fieldData,
        type: 'state'
      };
    }

    const readOnlyFields = [
      'leaseContract',
      'taskType',
      'property',
      'created_at'
    ];
    if (readOnlyFields.includes(name)) {
      return {
        ...fieldData,
        type: 'readonly'
      };
    }
    return {
      ...fieldData,
      type: 'text'
    };
  });

  return {
    ...keys,
    editables
  };
}

async function createTask(object: Record<string, unknown>) {
  return new TaskUseCases().create(object);
}

async function updateTask(object: Record<string, unknown>) {
  return new TaskUseCases().update(object);
}

async function removeTask(object: Record<string, unknown>) {
  return new TaskUseCases().remove(object);
}

async function generateEvent(_id: string, code?: string): Promise<void> {
  const taskUseCases = new TaskUseCases();
  const task = (await taskUseCases.findById(_id)) as ITask;
  if (!task.leaseContract) return;

  const leaseContractUsecase = new LeaseContractUseCases();
  const leaseContract = (await leaseContractUsecase.findById(
    task.leaseContract?.toString(),
    []
  )) as ILeaseContract;

  generateGoogleEvent(task, leaseContract, code);
}

async function getGoogleUrl(_id: string): Promise<string> {
  const taskUseCases = new TaskUseCases();
  const task = (await taskUseCases.findById(_id)) as ITask;
  if (!task.leaseContract) return '';

  const leaseContractUsecase = new LeaseContractUseCases();
  const leaseContract = (await leaseContractUsecase.findById(
    task.leaseContract?.toString(),
    []
  )) as ILeaseContract;

  return leaseContractUsecase.generateUrlRedirect(leaseContract);
}

export {
  createTask,
  generateEvent,
  getBeforeTwoTableTasks,
  getCurrentTableTasks,
  getFormFields,
  getGoogleUrl,
  getTask,
  removeTask,
  updateTask
};
