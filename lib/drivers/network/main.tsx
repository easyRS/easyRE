import { makePost } from './common';
import { ALL_LEASE_CONTRACT_METHODS_ENDPOINT } from './constants';

const createLeaseContract = async (data: StepMapper) => {
  await makePost(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT);
};

export default {
  createCallback: createLeaseContract
};
