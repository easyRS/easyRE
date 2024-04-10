import { Schema } from 'mongoose';

import ITask, { TASK_DEFINTION_STATES } from '../../entities/ITask';

const TaskSchema = new Schema<ITask>({
  created_at: { type: Date, required: true },
  leaseContract: { type: Schema.Types.ObjectId, ref: 'LeaseContract' },
  property: { type: Schema.Types.ObjectId, ref: 'Property' },
  amount: { type: Number, required: true },
  description: String,
  taskType: { type: Schema.Types.ObjectId, ref: 'TaskType', required: true },
  state: { type: String, enum: TASK_DEFINTION_STATES, required: true }
});

export default TaskSchema;
