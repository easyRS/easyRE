import { makeDelete, makePost, makePut } from './common';
import { ALL_LEASE_CONTRACT_METHODS_ENDPOINT } from './constants';

const createLeaseContract = async (data: IEntity) => {
  await makePost(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT);
};

const updateLeaseContract = async (data: IEntity) => {
  await makePut(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT);
};

const deleteLeaseContract = async (data: IEntity) => {
  await makeDelete(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT);
};

export default {
  createCallback: createLeaseContract,
  updateCallback: updateLeaseContract,
  deleteCallback: deleteLeaseContract
};
