import mongoose, { Model, Schema } from 'mongoose';

import IConfig from '../../domain/entities/IConfig';
import IContractDefinition from '../../domain/entities/IContractDefinition';
import ILeaseContract from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITask from '../../domain/entities/ITask';
import ITaskType from '../../domain/entities/ITaskType';
import ITenant from '../../domain/entities/ITenant';
import ConfigSchema from '../../domain/models/Config';
import ContractDefinitionSchema from '../../domain/models/ContractDefinition';
import LeaseContractSchema from '../../domain/models/LeaseContract';
import PropertySchema from '../../domain/models/Property';
import TaskSchema from '../../domain/models/Task';
import TaskTypeSchema from '../../domain/models/TaskType';
import TenantSchema from '../../domain/models/Tenant';

export type SchemaType = {
  Property: Model<IProperty>;
  Tenant: Model<ITenant>;
  ContractDefinition: Model<IContractDefinition>;
  LeaseContract: Model<ILeaseContract>;
  Task: Model<ITask>;
  TaskType: Model<ITaskType>;
  Config: Model<IConfig>;
  PSchema: Schema<IProperty>;
  TSchema: Schema<ITenant>;
  CSchema: Schema<IContractDefinition>;
  LCSchema: Schema<ILeaseContract>;
  TskSchema: Schema<ITask>;
  TTSchema: Schema<ITaskType>;
  ConfSchema: Schema<IConfig>;
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

  return {
    Property,
    Tenant,
    ContractDefinition,
    LeaseContract,
    Task,
    TaskType,
    Config,
    PSchema: PropertySchema,
    TSchema: TenantSchema,
    CSchema: ContractDefinitionSchema,
    LCSchema: LeaseContractSchema,
    TskSchema: TaskSchema,
    TTSchema: TaskTypeSchema,
    ConfSchema: ConfigSchema
  };
};

export default build;
