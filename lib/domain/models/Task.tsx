import { Schema } from 'mongoose';

import ITask, { TASK_DEFINTION_STATES } from '../entities/ITask';

const TaskSchema = new Schema<ITask>({
  created_at: Date,
  leaseContract: { type: Schema.Types.ObjectId, ref: 'LeaseContract' },
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  amount: Number,
  description: String,
  taskType: { type: Schema.Types.ObjectId, ref: 'TaskType' },
  state: { type: String, enum: TASK_DEFINTION_STATES }
});

export default TaskSchema;
