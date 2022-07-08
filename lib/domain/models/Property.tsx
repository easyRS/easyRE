import { Schema } from 'mongoose';

export interface IProperty {
  _id: string;
  coordinates: Array<number>;
  measure: string;
  name: string;
  location_details: string;
  description: string;
}

export const PropertySchema = new Schema<IProperty>({
  name: String,
  coordinates: [Number],
  measure: String,
  location_details: String,
  description: String
});
