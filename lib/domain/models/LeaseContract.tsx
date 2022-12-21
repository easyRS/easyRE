import { Schema } from 'mongoose';

import ILeaseContract from '../entities/ILeaseContract';

const LeaseContractSchema = new Schema<ILeaseContract>({
  name: String,
  description: String,
  timeAmount: String,
  termsConditions: String,
  state: String,
  startDate: Date,
  nextDate: Date,
  amount: Number,
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' }
});

export default LeaseContractSchema;
