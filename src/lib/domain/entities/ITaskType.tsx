import { Types } from 'mongoose';

export default interface ITaskType {
  _id?: Types.ObjectId;
  name: string;
  description: string;
}
