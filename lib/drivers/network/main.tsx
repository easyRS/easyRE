import { makePost } from './common';
import {
  ALL_LEASE_CONTRACT_METHODS_ENDPOINT,
  ALL_LEASE_TASKS_CONTRACT_METHODS_ENDPOINT
} from './constants';

const createLeaseContract = async (
  data: StepMapper,
  onSuccess?: (sucessObj: Response) => void
) => {
  await makePost(data, ALL_LEASE_CONTRACT_METHODS_ENDPOINT, onSuccess);
};

const createTasks = async (
  data: Record<string, unknown>,
  onSuccess?: (sucessObj: Response) => void
) => {
  await makePost(data, ALL_LEASE_TASKS_CONTRACT_METHODS_ENDPOINT, onSuccess);
};

export default {
  createCallback: createLeaseContract,
  createTasksCallback: createTasks
};
