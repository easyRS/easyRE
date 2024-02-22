import builder from './builder';

export default async function deleteAllData() {
  const {
    Task,
    LeaseContract,
    Property,
    TaskType,
    ContractDefinition,
    Tenant,
    Transaction,
    TransactionType,
    User,
    Event
  } = await builder();

  await Task.deleteMany();
  await LeaseContract.deleteMany();
  await Event.deleteMany();
  await TaskType.deleteMany();
  await ContractDefinition.deleteMany();
  await Tenant.deleteMany();
  await Property.deleteMany();
  await TransactionType.deleteMany();
  await Transaction.deleteMany();
  await User.deleteMany();
}
