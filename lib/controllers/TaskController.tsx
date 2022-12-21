import ITask from '../domain/entities/ITask';
import TaskUseCases from '../useCases/TaskUseCases';

async function getTasks(): Promise<ITask[]> {
  return new TaskUseCases().list();
}

async function getTableTasks(): Promise<TableMapping<ITaskTable>> {
  const task = await getTasks();

  const labelsMapping: ITaskTable = {
    created_at: 'Created At',
    taskType: 'Type',
    description: 'Description'
  };

  return {
    tableName: labelsMapping,
    arrayObj: task
  };
}

async function getTask(_id: string): Promise<ITask> {
  return new TaskUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new TaskUseCases().getKeys();
  const editables = keys.editables.map((fieldData) => {
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

export {
  getTasks,
  getTableTasks,
  getFormFields,
  createTask,
  getTask,
  updateTask,
  removeTask
};
