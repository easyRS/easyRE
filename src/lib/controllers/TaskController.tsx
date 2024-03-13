import IEvent from '../domain/entities/IEvent';
import ILeaseContract from '../domain/entities/ILeaseContract';
import ITask from '../domain/entities/ITask';

import {
  generateGoogleEvent,
  getOauthClient
} from '../drivers/network/googleapis';
import EventUseCases from '../useCases/EventUseCases';
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

async function listAllWorkInProgress(): Promise<TableMapping<ITaskTable>> {
  const taskUseCase = new TaskUseCases();
  const tasks = await taskUseCase.listAllWorkInProgress();
  return getTableTasks(tasks);
}

async function listAllCompleted(): Promise<TableMapping<ITaskTable>> {
  const taskUseCase = new TaskUseCases();
  const tasks = await taskUseCase.listAllCompleted();
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
  return new TaskUseCases().createGenericTask(object);
}

async function updateTask(object: Record<string, unknown>) {
  return new TaskUseCases().update(object);
}

async function removeTask(object: Record<string, unknown>) {
  return new TaskUseCases().remove(object);
}

async function cleanEvents(): Promise<void> {
  const eventUseCases = new EventUseCases();
  await eventUseCases.removeByQuery({});
}

async function generateEvent(code: string, _id?: string): Promise<boolean> {
  try {
    const oauth2Client = await getOauthClient(code);
    if (!oauth2Client) return false;

    if (_id) {
      const taskUseCases = new TaskUseCases();
      const task = (await taskUseCases.findById(_id)) as ITask;
      if (!task.leaseContract) return false;

      const leaseContractUsecase = new LeaseContractUseCases();
      const leaseContract = (await leaseContractUsecase.findById(
        task.leaseContract?.toString(),
        []
      )) as ILeaseContract;

      generateGoogleEvent(task, leaseContract, oauth2Client);
    } else {
      const eventUseCases = new EventUseCases();
      const events = (await eventUseCases.list([
        { path: 'leaseContract' },
        { path: 'task' }
      ])) as IEvent[];
      const results: Promise<void>[] = [];
      for (const eventObj of events) /* eslint-disable-line */ {
        if (eventObj.leaseContract && eventObj.task) {
          results.push(
            generateGoogleEvent(
              eventObj.task as ITask,
              eventObj.leaseContract as ILeaseContract,
              oauth2Client
            )
          );
        }
      }

      await Promise.all(results);
    }
    return true;
  } catch (error) {
    return false;
  }
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

async function shouldCreateEvents(): Promise<string> {
  return new EventUseCases().shouldCreateEvents();
}

export {
  cleanEvents,
  createTask,
  generateEvent,
  getBeforeTwoTableTasks,
  getCurrentTableTasks,
  getFormFields,
  getGoogleUrl,
  getTask,
  listAllCompleted,
  listAllWorkInProgress,
  removeTask,
  shouldCreateEvents,
  updateTask
};
