import { Schema } from 'mongoose';

import ITaskType from '../entities/ITaskType';

const TaskSchema = new Schema<ITaskType>({
  name: String,
  description: String
});

export default TaskSchema;
