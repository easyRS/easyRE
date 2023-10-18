import { makePost } from './common';
import { ALL_LEASE_CONTRACT_METHODS_ENDPOINT } from './constants';

const createLeaseContract = async (
  data: StepMapper,
  onSuccess?: (sucessObj: Record<string, unknown>) => void
) => {
  await makePost(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT, onSuccess);
};

export default {
  createCallback: createLeaseContract
};
