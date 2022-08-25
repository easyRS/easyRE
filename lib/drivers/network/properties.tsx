import { call } from './common';
import {
  ALL_PROPERTY_METHODS_ENDPOINT,
  DELETE_METHOD,
  POST_METHOD,
  PUT_METHOD
} from './constants';

const _formatUtils = (data: Record<string, unknown>) => {
  const { latitude, longitude } = data;
  return {
    ...data,
    coordinates: `${latitude},${longitude}`
  };
};
export const createProperty = async (data: Record<string, unknown>) => {
  await call({
    endpoint: ALL_PROPERTY_METHODS_ENDPOINT,
    method: POST_METHOD,
    data: _formatUtils(data)
  });
};

export const updateProperty = async (data: Record<string, unknown>) => {
  await call({
    endpoint: ALL_PROPERTY_METHODS_ENDPOINT,
    method: PUT_METHOD,
    data: _formatUtils({ ...data })
  });
};

export const deleteProperty = async (data: Record<string, unknown>) => {
  await call({
    endpoint: ALL_PROPERTY_METHODS_ENDPOINT,
    method: DELETE_METHOD,
    data
  });
};
