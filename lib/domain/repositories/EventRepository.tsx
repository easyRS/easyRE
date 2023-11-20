import IEvent from '../entities/IEvent';

import MongooseAbstractRepository from './base/MongooseAbstractRepository';

export default class EventRepository extends MongooseAbstractRepository<IEvent> {
  constructor() {
    super('Event', 'ESchema');
  }
}
