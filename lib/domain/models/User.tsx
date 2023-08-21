import { Schema } from 'mongoose';

import IUser from '../entities/IUser';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default UserSchema;
