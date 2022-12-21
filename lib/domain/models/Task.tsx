import { Schema } from 'mongoose';

import ITask from '../entities/ITask';

const TaskSchema = new Schema<ITask>({
  created_at: String,
  description: String,
  taskType: { type: Schema.Types.ObjectId, ref: 'TaskType' },
  leaseContract: { type: Schema.Types.ObjectId, ref: 'LeaseContract' },
  property: { type: Schema.Types.ObjectId, ref: 'Property' }
});

export default TaskSchema;
