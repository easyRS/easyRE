import { makeDelete, makePost, makePut } from './common';
import { ALL_USER_METHODS_ENDPOINT } from './constants';

const createUser = async (data: IEntity) => {
  await makePost(data, ALL_USER_METHODS_ENDPOINT);
};

const updateUser = async (data: IEntity) => {
  await makePut(data, ALL_USER_METHODS_ENDPOINT);
};

const deleteUser = async (data: IEntity) => {
  await makeDelete(data, ALL_USER_METHODS_ENDPOINT);
};

export default {
  createCallback: createUser,
  updateCallback: updateUser,
  deleteCallback: deleteUser
};
