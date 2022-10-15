import { Schema } from 'mongoose';

import IContractDefinition from '../entities/IContractDefinition';

const ContractDefinitionSchema = new Schema<IContractDefinition>({
  name: String,
  description: String,
  timeAmount: String,
  termsConditions: String,
  state: String
});

export default ContractDefinitionSchema;
