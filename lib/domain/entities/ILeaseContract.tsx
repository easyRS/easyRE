import { Types } from 'mongoose';
import IContractDefinition from './IContractDefinition';

export default interface ILeaseContract extends IContractDefinition {
  startDate: string;
  nextDate?: string;
  property: Types.ObjectId;
  tenant: Types.ObjectId;
  amount: number;
}
