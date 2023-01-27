import { Schema } from 'mongoose';

import ITask from '../entities/ITask';

const TaskSchema = new Schema<ITask>({
  created_at: String,
  leaseContract: { type: Schema.Types.ObjectId, ref: 'LeaseContract' },
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  amount: Number,
  description: String,
  taskType: { type: Schema.Types.ObjectId, ref: 'TaskType' }
});

export default TaskSchema;
