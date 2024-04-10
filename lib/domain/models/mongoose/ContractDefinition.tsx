import { Schema } from 'mongoose';

import IContractDefinition, {
  CONTRACT_DEFINTION_STATES
} from '../../entities/IContractDefinition';

import TIME_TYPE_OPTIONS from '../../entities/TimeType';

const ContractDefinitionSchema = new Schema<IContractDefinition>({
  name: { type: String, required: true },
  description: String,
  timeAmount: { type: String, required: true },
  timeType: { type: String, enum: TIME_TYPE_OPTIONS, required: true },
  termsConditions: { type: String, required: true },
  state: { type: String, enum: CONTRACT_DEFINTION_STATES, required: true }
});

export default ContractDefinitionSchema;
