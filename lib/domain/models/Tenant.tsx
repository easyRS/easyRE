import { Schema } from 'mongoose';

import ITenant from '../entities/ITenant';

const TenantSchema = new Schema<ITenant>({
  name: String,
  phone: String,
  notes: String
});

export default TenantSchema;
