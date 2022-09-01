import mongoose, { Model, Schema } from 'mongoose';

import IProperty from '../../domain/entities/IProperty';
import ITenant from '../../domain/entities/ITenant';
import PropertySchema from '../../domain/models/Property';
import TenantSchema from '../../domain/models/Tenant';

export type SchemaType = {
  Property: Model<IProperty>;
  Tenant: Model<ITenant>;
  PSchema: Schema<IProperty>;
  TSchema: Schema<ITenant>;
};

const build = async (): Promise<SchemaType> => {
  const Property =
    mongoose.models.Property ||
    mongoose.model<IProperty>('Property', PropertySchema);

  const Tenant =
    mongoose.models.Tenant || mongoose.model<ITenant>('Tenant', TenantSchema);
  return { Property, Tenant, PSchema: PropertySchema, TSchema: TenantSchema };
};

export default build;
