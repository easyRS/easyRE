import { makeDelete, makePost, makePut } from './common';
import { ALL_TENANT_METHODS_ENDPOINT } from './constants';

const createProperty = async (data: Record<string, unknown>) => {
  await makePost(data, ALL_TENANT_METHODS_ENDPOINT);
};

const updateProperty = async (data: Record<string, unknown>) => {
  await makePut(data, ALL_TENANT_METHODS_ENDPOINT);
};

const deleteProperty = async (data: Record<string, unknown>) => {
  await makeDelete(data, ALL_TENANT_METHODS_ENDPOINT);
};

export default {
  createCallback: createProperty,
  updateCallback: updateProperty,
  deleteCallback: deleteProperty
};
