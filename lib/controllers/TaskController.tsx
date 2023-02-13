import ITask from '../domain/entities/ITask';
import TaskUseCases from '../useCases/TaskUseCases';

async function getTasks(workInProgress = false): Promise<ITask[]> {
  return workInProgress
    ? new TaskUseCases().listWorkInProgress()
    : new TaskUseCases().list();
}

async function getTableTasks(
  workInProgress = false
): Promise<TableMapping<ITaskTable>> {
  const task = await getTasks(workInProgress);

  const labelsMapping: ITaskTable = {
    created_at: 'Created At',
    taskType: 'Type',
    state: 'State',
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

export {
  getTasks,
  getTableTasks,
  getFormFields,
  createTask,
  getTask,
  updateTask,
  removeTask
};
