import { Types } from 'mongoose';

export const CONTRACT_ACTIVE_STATE = 'Active';
export const CONTRACT_INACTIVE_STATE = 'Inactive';

export const CONTRACT_DEFINTION_STATES = [
  CONTRACT_ACTIVE_STATE,
  CONTRACT_INACTIVE_STATE
];

export default interface IContractDefinition {
  _id?: Types.ObjectId;
  name: string;
  description: string;
  timeAmount: string;
  timeType: string;
  termsConditions: string;
  state: string;
}
