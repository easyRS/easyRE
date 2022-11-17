export default interface ILeaseContract {
  _id?: string;
  name: string;
  description: string;
  timeAmount: string;
  termsConditions: string;
  state: string;
  property: Record<string, unknown>;
  tenant: Record<string, unknown>;
}
