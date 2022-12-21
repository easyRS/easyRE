import { Types } from 'mongoose';

export default interface ITask {
  _id?: Types.ObjectId;
  created_at: string;
  description: string;
  taskType: Types.ObjectId;
  leaseContract?: Types.ObjectId;
  property?: Types.ObjectId;
  state: string;
}
