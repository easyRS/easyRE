export default interface ITransaction {
  _id?: SYS_ID;
  created_at: Date | string;
  amount: number;
  notes: string;
  task: SYS_ID;
  transactionType: SYS_ID;
}
