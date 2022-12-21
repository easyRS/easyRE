import { Types } from 'mongoose';

export default interface IContractDefinition {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  timeAmount: string;
  termsConditions: string;
  state: string;
}
