import { Schema } from 'mongoose';

import ILeaseContract, {
  LEASE_DEFINTION_STATES
} from '../entities/ILeaseContract';

import TIME_TYPE_OPTIONS from '../entities/TimeType';

const LeaseContractSchema = new Schema<ILeaseContract>({
  name: String,
  description: String,
  timeAmount: String,
  timeType: { type: String, enum: TIME_TYPE_OPTIONS },
  termsConditions: String,
  state: { type: String, enum: LEASE_DEFINTION_STATES },
  startDate: Date,
  nextDate: Date,
  amount: Number,
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant' }
});

export default LeaseContractSchema;
