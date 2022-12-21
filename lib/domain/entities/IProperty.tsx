import { Types } from 'mongoose';

export default interface IProperty {
  _id?: Types.ObjectId;
  coordinates: Array<number>;
  measure: string;
  name: string;
  amount: number;
  location_details: string;
  description: string;
}
