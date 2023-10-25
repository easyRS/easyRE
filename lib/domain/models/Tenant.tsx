import { Schema } from 'mongoose';

import ITenant from '../entities/ITenant';

const TenantSchema = new Schema<ITenant>({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  notes: String
});

export default TenantSchema;
