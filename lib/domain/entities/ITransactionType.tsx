import { Types } from 'mongoose';

export default interface ITransactionType {
  _id?: Types.ObjectId;
  name: string;
}
