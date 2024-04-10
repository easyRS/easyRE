export default interface IProperty {
  _id?: SYS_ID;
  coordinates: Array<number>;
  measure: string;
  name: string;
  amount: number;
  location_details: string;
  description: string;
}
