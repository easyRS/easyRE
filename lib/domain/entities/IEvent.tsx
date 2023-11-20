import { Types } from 'mongoose';

export default interface IEvent {
  _id?: Types.ObjectId;
  leaseContract: Types.ObjectId;
  task: Types.ObjectId;
}
