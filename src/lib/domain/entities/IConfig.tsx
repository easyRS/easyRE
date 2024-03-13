import { Types } from 'mongoose';

export default interface IConfig {
  _id?: Types.ObjectId;
  isDailyJobRunning: boolean;
}
