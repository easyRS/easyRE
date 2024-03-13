import { Schema } from 'mongoose';

import IConfig from '../entities/IConfig';

const ConfigSchema = new Schema<IConfig>({
  isDailyJobRunning: Boolean
});

export default ConfigSchema;
