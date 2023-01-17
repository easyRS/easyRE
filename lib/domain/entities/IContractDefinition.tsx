import { Types } from 'mongoose';

export default interface IContractDefinition {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  timeAmount: string;
  timeType: string; // TODO: make this a dropdown field!
  termsConditions: string;
  state: string;
}
