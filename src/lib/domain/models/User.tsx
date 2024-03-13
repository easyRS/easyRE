import { Schema } from 'mongoose';

import IUser from '../entities/IUser';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  google_client_id: { type: String },
  google_client_secret: { type: String },
  google_redirect_url: { type: String },
  google_api_key: { type: String },
  google_tokens: { type: Schema.Types.Mixed }
});

export default UserSchema;
