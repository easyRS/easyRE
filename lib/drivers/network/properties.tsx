import IProperty from '../../domain/entities/IProperty';
import { makeDelete, makePost, makePut } from './common';
import { ALL_PROPERTY_METHODS_ENDPOINT } from './constants';

const _formatUtils = (data: IEntity) => {
  const dumpUnknown = data as unknown;
  const { latitude, longitude } = dumpUnknown as Record<string, unknown>;

  const dumpProperty = data as IProperty;
  return {
    ...dumpProperty,
    coordinates: [latitude, longitude]
  } as IProperty;
};
const createProperty = async (data: IEntity) => {
  await makePost(_formatUtils(data), ALL_PROPERTY_METHODS_ENDPOINT);
};

const updateProperty = async (data: IEntity) => {
  await makePut(_formatUtils(data), ALL_PROPERTY_METHODS_ENDPOINT);
};

const deleteProperty = async (data: IEntity) => {
  await makeDelete(data, ALL_PROPERTY_METHODS_ENDPOINT);
};

export default {
  createCallback: createProperty,
  updateCallback: updateProperty,
  deleteCallback: deleteProperty
};
