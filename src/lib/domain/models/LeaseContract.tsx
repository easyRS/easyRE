import { Schema } from 'mongoose';

import ILeaseContract, {
  LEASE_DEFINTION_STATES
} from '../entities/ILeaseContract';

import TIME_TYPE_OPTIONS from '../entities/TimeType';

const LeaseContractSchema = new Schema<ILeaseContract>({
  name: { type: String, required: true },
  description: String,
  timeAmount: { type: String, required: true },
  timeType: { type: String, enum: TIME_TYPE_OPTIONS, required: true },
  termsConditions: { type: String, required: true },
  state: { type: String, enum: LEASE_DEFINTION_STATES, required: true },
  startDate: { type: Date, required: true },
  nextDate: Date,
  amount: { type: Number, required: true },
  property: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
  tenant: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true }
});

export default LeaseContractSchema;
