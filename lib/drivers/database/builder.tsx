import mongoose, { Model } from 'mongoose';

import IProperty from '../../domain/entities/IProperty';
import PropertySchema from '../../domain/models/Property';

export type SchemaType = {
  Property: Model<IProperty>;
};

const build = async (): Promise<SchemaType> => {
  const Property =
    mongoose.models.Property ||
    mongoose.model<IProperty>('Property', PropertySchema);
  return { Property };
};

export default build;
