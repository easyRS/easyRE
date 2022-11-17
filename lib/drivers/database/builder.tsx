import mongoose, { Model, Schema } from 'mongoose';

import IContractDefinition from '../../domain/entities/IContractDefinition';
import ILeaseContract from '../../domain/entities/ILeaseContract';
import IProperty from '../../domain/entities/IProperty';
import ITenant from '../../domain/entities/ITenant';
import ContractDefinitionSchema from '../../domain/models/ContractDefinition';
import LeaseContractSchema from '../../domain/models/LeaseContract';
import PropertySchema from '../../domain/models/Property';
import TenantSchema from '../../domain/models/Tenant';

export type SchemaType = {
  Property: Model<IProperty>;
  Tenant: Model<ITenant>;
  ContractDefinition: Model<IContractDefinition>;
  LeaseContract: Model<ILeaseContract>;
  PSchema: Schema<IProperty>;
  TSchema: Schema<ITenant>;
  CSchema: Schema<IContractDefinition>;
  LCSchema: Schema<ILeaseContract>;
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

  return {
    Property,
    Tenant,
    ContractDefinition,
    LeaseContract,
    PSchema: PropertySchema,
    TSchema: TenantSchema,
    CSchema: ContractDefinitionSchema,
    LCSchema: LeaseContractSchema
  };
};

export default build;
