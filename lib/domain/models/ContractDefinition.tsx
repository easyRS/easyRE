import { Schema } from 'mongoose';

import IContractDefinition from '../entities/IContractDefinition';

const ContractDefinitionSchema = new Schema<IContractDefinition>({
  name: String,
  description: String,
  timeAmount: String,
  amount: Number,
  termsConditions: String,
  state: String
});

export default ContractDefinitionSchema;
