import { Types } from 'mongoose';

export default interface ITenant {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  notes: string;
}
