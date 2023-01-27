import { Types } from 'mongoose';

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
