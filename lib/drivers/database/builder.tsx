import mongoose, { Model, Schema } from 'mongoose';

import IConfig from '../../domain/entities/IConfig';
import IContractDefinition from '../../domain/entities/IContractDefinition';
import ILeaseContract from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITask from '../../domain/entities/ITask';
import ITaskType from '../../domain/entities/ITaskType';
import ITenant from '../../domain/entities/ITenant';
import ITransaction from '../../domain/entities/ITransaction';
import ITransactionType from '../../domain/entities/ITransactionType';
import IUser from '../../domain/entities/IUser';
import ConfigSchema from '../../domain/models/Config';
import ContractDefinitionSchema from '../../domain/models/ContractDefinition';
import LeaseContractSchema from '../../domain/models/LeaseContract';
import PropertySchema from '../../domain/models/Property';
import TaskSchema from '../../domain/models/Task';
import TaskTypeSchema from '../../domain/models/TaskType';
import TenantSchema from '../../domain/models/Tenant';
import TransactionSchema from '../../domain/models/Transaction';
import TransactionTypeSchema from '../../domain/models/TransactionType';
import UserSchema from '../../domain/models/User';

export type SchemaType = {
  Property: Model<IProperty>;
  Tenant: Model<ITenant>;
  ContractDefinition: Model<IContractDefinition>;
  LeaseContract: Model<ILeaseContract>;
  Task: Model<ITask>;
  TaskType: Model<ITaskType>;
  Config: Model<IConfig>;
  Transaction: Model<ITransaction>;
  TransactionType: Model<ITransactionType>;
  User: Model<IUser>;
  PSchema: Schema<IProperty>;
  TSchema: Schema<ITenant>;
  CSchema: Schema<IContractDefinition>;
  LCSchema: Schema<ILeaseContract>;
  TskSchema: Schema<ITask>;
  TTSchema: Schema<ITaskType>;
  ConfSchema: Schema<IConfig>;
  TraSchema: Schema<ITransaction>;
  TraTSchema: Schema<ITransactionType>;
  USchema: Schema<IUser>;
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

  const Config =
    mongoose.models.Config || mongoose.model<IConfig>('Config', ConfigSchema);

  const Transaction =
    mongoose.models.Transaction ||
    mongoose.model<ITransaction>('Transaction', TransactionSchema);

  const TransactionType =
    mongoose.models.TransactionType ||
    mongoose.model<ITransactionType>('TransactionType', TransactionTypeSchema);

  const User =
    mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

  return {
    Property,
    Tenant,
    ContractDefinition,
    LeaseContract,
    Task,
    TaskType,
    Config,
    Transaction,
    TransactionType,
    User,
    PSchema: PropertySchema,
    TSchema: TenantSchema,
    CSchema: ContractDefinitionSchema,
    LCSchema: LeaseContractSchema,
    TskSchema: TaskSchema,
    TTSchema: TaskTypeSchema,
    ConfSchema: ConfigSchema,
    TraSchema: TransactionSchema,
    TraTSchema: TransactionTypeSchema,
    USchema: UserSchema
  };
};

export default build;
