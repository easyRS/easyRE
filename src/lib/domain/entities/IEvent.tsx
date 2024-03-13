import { Types } from 'mongoose';
import ITask from './ITask';
import ILeaseContract from './ILeaseContract';

export default interface IEvent {
  _id?: Types.ObjectId;
  leaseContract: Types.ObjectId | ILeaseContract;
  task: Types.ObjectId | ITask;
}
