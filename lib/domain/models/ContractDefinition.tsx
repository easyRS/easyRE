import { Schema } from 'mongoose';

import IContractDefinition from '../entities/IContractDefinition';

export const timeType = ['Daily', 'Monthly'];

const ContractDefinitionSchema = new Schema<IContractDefinition>({
  name: String,
  description: String,
  timeAmount: String,
  timeType: { type: String, enum: timeType },
  termsConditions: String,
  state: String
});

export default ContractDefinitionSchema;
