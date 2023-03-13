import { Schema } from 'mongoose';

import ITenant from '../entities/ITenant';

const TenantSchema = new Schema<ITenant>({
  name: { type: String, required: true },
  phone: String,
  notes: String
});

export default TenantSchema;
