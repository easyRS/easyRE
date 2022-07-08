import mongoose from 'mongoose';
import { IProperty, PropertySchema } from '../../domain/models/Property';

const build = async () => {
  const Property =
    mongoose.models.Property ||
    mongoose.model<IProperty>('Property', PropertySchema);

  return { Property };
};

export default build;
