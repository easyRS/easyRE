import { Schema } from 'mongoose';

import IProperty from '../../entities/IProperty';

const PropertySchema = new Schema<IProperty>({
  name: { type: String, required: true },
  coordinates: { type: [Number], required: true },
  measure: { type: String, required: true },
  amount: { type: Number, required: true },
  location_details: String,
  description: String
});

export default PropertySchema;
