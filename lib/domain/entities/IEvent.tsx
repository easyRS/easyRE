import ILeaseContract from './ILeaseContract';
import ITask from './ITask';

export default interface IEvent {
  _id?: SYS_ID;
  leaseContract: SYS_ID | ILeaseContract;
  task: SYS_ID | ITask;
}
