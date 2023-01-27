import { makeDelete, makePost, makePut } from './common';
import { ALL_TASK_METHODS_ENDPOINT } from './constants';

const createTask = async (data: IEntity) => {
  await makePost(data, ALL_TASK_METHODS_ENDPOINT);
};

const updateTask = async (data: IEntity) => {
  await makePut(data, ALL_TASK_METHODS_ENDPOINT);
};

const deleteTask = async (data: IEntity) => {
  await makeDelete(data, ALL_TASK_METHODS_ENDPOINT);
};

export default {
  createCallback: createTask,
  updateCallback: updateTask,
  deleteCallback: deleteTask
};
