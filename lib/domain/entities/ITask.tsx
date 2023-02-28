import { Types } from 'mongoose';

export const TASK_WORK_IN_PROGRESS_STATE = 'Work In Progress';
export const TASK_CLOSE_COMPLETED_STATE = 'Close Completed';
export const TASK_CLOSE_CANCELED_STATE = 'Close Canceled';

export const TASK_DEFINTION_STATES = [
  TASK_WORK_IN_PROGRESS_STATE,
  TASK_CLOSE_COMPLETED_STATE,
  TASK_CLOSE_CANCELED_STATE
];

export default interface ITask {
  _id?: Types.ObjectId;
  created_at: string;
  leaseContract?: Types.ObjectId;
  property?: Types.ObjectId;
  amount: number;
  description: string;
  taskType: Types.ObjectId;
  state: string;
}
