import { makeDelete, makePost, makePut } from './common';
import { ALL_PROPERTY_METHODS_ENDPOINT } from './constants';

const _formatUtils = (data: Record<string, unknown>) => {
  const { latitude, longitude } = data;
  return {
    ...data,
    coordinates: `${latitude},${longitude}`
  };
};
const createProperty = async (data: Record<string, unknown>) => {
  await makePost(_formatUtils(data), ALL_PROPERTY_METHODS_ENDPOINT);
};

const updateProperty = async (data: Record<string, unknown>) => {
  await makePut(_formatUtils(data), ALL_PROPERTY_METHODS_ENDPOINT);
};

const deleteProperty = async (data: Record<string, unknown>) => {
  await makeDelete(data, ALL_PROPERTY_METHODS_ENDPOINT);
};

export default {
  createCallback: createProperty,
  updateCallback: updateProperty,
  deleteCallback: deleteProperty
};
