import { Schema } from 'mongoose';

import ITransaction from '../entities/ITransaction';

const TransactionSchema = new Schema<ITransaction>({
  created_at: String,
  task: { type: Schema.Types.ObjectId, ref: 'Task' },
  transactionType: { type: Schema.Types.ObjectId, ref: 'TransactionType' },
  amount: Number,
  notes: String
});

export default TransactionSchema;
