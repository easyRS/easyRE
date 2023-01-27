import { Schema } from 'mongoose';

import ITransactionType from '../entities/ITransactionType';

const TransactionTypeSchema = new Schema<ITransactionType>({
  name: String
});

export default TransactionTypeSchema;
