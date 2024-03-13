import { Schema } from 'mongoose';

import IEvent from '../entities/IEvent';

const EventSchema = new Schema<IEvent>({
  leaseContract: {
    type: Schema.Types.ObjectId,
    ref: 'LeaseContract',
    required: true
  },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true }
});

export default EventSchema;
