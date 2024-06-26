import mongoose, { Model, Schema } from 'mongoose';

import IContractDefinition from '../../domain/entities/IContractDefinition';
import IEvent from '../../domain/entities/IEvent';
import ILeaseContract from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITask from '../../domain/entities/ITask';
import ITaskType from '../../domain/entities/ITaskType';
import ITenant from '../../domain/entities/ITenant';
import ITransaction from '../../domain/entities/ITransaction';
import ITransactionType from '../../domain/entities/ITransactionType';
import IUser from '../../domain/entities/IUser';
import ContractDefinitionSchema from '../../domain/models/mongoose/ContractDefinition';
import EventSchema from '../../domain/models/mongoose/Event';
import LeaseContractSchema from '../../domain/models/mongoose/LeaseContract';
import PropertySchema from '../../domain/models/mongoose/Property';
import TaskSchema from '../../domain/models/mongoose/Task';
import TaskTypeSchema from '../../domain/models/mongoose/TaskType';
import TenantSchema from '../../domain/models/mongoose/Tenant';
import TransactionSchema from '../../domain/models/mongoose/Transaction';
import TransactionTypeSchema from '../../domain/models/mongoose/TransactionType';
import UserSchema from '../../domain/models/mongoose/User';

export type SchemaType = {
  Property: Model<IProperty>;
  Tenant: Model<ITenant>;
  ContractDefinition: Model<IContractDefinition>;
  LeaseContract: Model<ILeaseContract>;
  Task: Model<ITask>;
  TaskType: Model<ITaskType>;
  Transaction: Model<ITransaction>;
  TransactionType: Model<ITransactionType>;
  User: Model<IUser>;
  Event: Model<IEvent>;
  PSchema: Schema<IProperty>;
  TSchema: Schema<ITenant>;
  CSchema: Schema<IContractDefinition>;
  LCSchema: Schema<ILeaseContract>;
  TskSchema: Schema<ITask>;
  TTSchema: Schema<ITaskType>;
  TraSchema: Schema<ITransaction>;
  TraTSchema: Schema<ITransactionType>;
  USchema: Schema<IUser>;
  ESchema: Schema<IEvent>;
};

const build = async (): Promise<SchemaType> => {
  const Property =
    mongoose.models.Property ||
    mongoose.model<IProperty>('Property', PropertySchema);

  const Tenant =
    mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);

  const ContractDefinition =
    mongoose.models.ContractDefinition ||
    mongoose.model<IContractDefinition>(
      'ContractDefinition',
      ContractDefinitionSchema
    );

  const LeaseContract =
    mongoose.models.LeaseContract ||
    mongoose.model<ILeaseContract>('LeaseContract', LeaseContractSchema);

  const Task =
    mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

  const TaskType =
    mongoose.models.TaskType ||
    mongoose.model<ITaskType>('TaskType', TaskTypeSchema);

  const Transaction =
    mongoose.models.Transaction ||
    mongoose.model<ITransaction>('Transaction', TransactionSchema);

  const TransactionType =
    mongoose.models.TransactionType ||
    mongoose.model<ITransactionType>('TransactionType', TransactionTypeSchema);

  const User =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

  const Event =
    mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

  return {
    Property,
    Tenant,
    ContractDefinition,
    LeaseContract,
    Task,
    TaskType,
    Transaction,
    TransactionType,
    User,
    Event,
    PSchema: PropertySchema,
    TSchema: TenantSchema,
    CSchema: ContractDefinitionSchema,
    LCSchema: LeaseContractSchema,
    TskSchema: TaskSchema,
    TTSchema: TaskTypeSchema,
    TraSchema: TransactionSchema,
    TraTSchema: TransactionTypeSchema,
    USchema: UserSchema,
    ESchema: EventSchema
  };
};

export default build;
