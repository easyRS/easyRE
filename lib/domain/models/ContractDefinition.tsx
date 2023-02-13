import { Schema } from 'mongoose';

import IContractDefinition, {
  CONTRACT_DEFINTION_STATES
} from '../entities/IContractDefinition';

import TIME_TYPE_OPTIONS from '../entities/TimeType';

const ContractDefinitionSchema = new Schema<IContractDefinition>({
  name: String,
  description: String,
  timeAmount: String,
  timeType: { type: String, enum: TIME_TYPE_OPTIONS },
  termsConditions: String,
  state: { type: String, enum: CONTRACT_DEFINTION_STATES }
});

export default ContractDefinitionSchema;
