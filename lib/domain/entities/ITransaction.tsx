import { Types } from 'mongoose';

export default interface ITransaction {
  _id?: Types.ObjectId;
  created_at: Date | string;
  amount: number;
  notes: string;
  task: Types.ObjectId;
  transactionType: Types.ObjectId;
}
