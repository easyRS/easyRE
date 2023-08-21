import { Types } from 'mongoose';

export default interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
}
