import { Schema } from 'mongoose';

import ITransaction from '../entities/ITransaction';

const TransactionSchema = new Schema<ITransaction>({
  created_at: { type: Date, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  transactionType: { type: Schema.Types.ObjectId, ref: 'TransactionType' },
  amount: { type: Number, required: true },
  notes: { type: String, required: true }
});

export default TransactionSchema;
