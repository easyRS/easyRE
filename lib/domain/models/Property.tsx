import { Schema } from 'mongoose';

import IProperty from '../entities/IProperty';

const PropertySchema = new Schema<IProperty>({
  name: String,
  coordinates: [Number],
  measure: String,
  location_details: String,
  description: String
});

export default PropertySchema;
