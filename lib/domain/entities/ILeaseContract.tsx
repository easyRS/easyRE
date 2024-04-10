import IContractDefinition from './IContractDefinition';
import IProperty from './IProperty';
import ITenant from './ITenant';

export const LEASE_DRAFT_STATE = 'Draft';
export const LEASE_WORK_IN_PROGRESS_STATE = 'Work In Progress';
export const LEASE_CLOSE_COMPLETED_STATE = 'Close Completed';
export const LEASE_CLOSE_CANCELED_STATE = 'Close Canceled';

export const LEASE_DEFINTION_STATES = [
  LEASE_DRAFT_STATE,
  LEASE_WORK_IN_PROGRESS_STATE,
  LEASE_CLOSE_COMPLETED_STATE,
  LEASE_CLOSE_CANCELED_STATE
];

export default interface ILeaseContract extends IContractDefinition {
  startDate: Date | string;
  nextDate?: Date | string;
  property: SYS_ID | IProperty | null;
  tenant: SYS_ID | ITenant | null;
  amount: number;
}
