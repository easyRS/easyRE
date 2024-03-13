import { makeDelete, makePost, makePut } from './common';
import { ALL_TENANT_METHODS_ENDPOINT } from './constants';

const createProperty = async (data: IEntity) => {
  await makePost(data, ALL_TENANT_METHODS_ENDPOINT);
};

const updateProperty = async (data: IEntity) => {
  await makePut(data, ALL_TENANT_METHODS_ENDPOINT);
};

const deleteProperty = async (data: IEntity) => {
  await makeDelete(data, ALL_TENANT_METHODS_ENDPOINT);
};

export default {
  createCallback: createProperty,
  updateCallback: updateProperty,
  deleteCallback: deleteProperty
};
