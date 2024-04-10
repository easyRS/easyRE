import ITaskType from './ITaskType';

export const TASK_WORK_IN_PROGRESS_STATE = 'Work In Progress';
export const TASK_CLOSE_COMPLETED_STATE = 'Close Completed';
export const TASK_CLOSE_CANCELED_STATE = 'Close Canceled';

export const TASK_DEFINTION_STATES = [
  TASK_WORK_IN_PROGRESS_STATE,
  TASK_CLOSE_COMPLETED_STATE,
  TASK_CLOSE_CANCELED_STATE
];

export default interface ITask {
  _id?: SYS_ID;
  created_at: Date | string;
  leaseContract?: SYS_ID;
  property?: SYS_ID;
  amount: number;
  description: string;
  taskType: SYS_ID | ITaskType | string;
  state: string;
}
