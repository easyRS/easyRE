import { Types } from 'mongoose';
import IEvent from '../domain/entities/IEvent';
import EventRepository from '../domain/repositories/EventRepository';
import { generateAuthUrl } from '../drivers/network/googleapis';
import AbstractUseCases from './AbstractUseCases';

export default class EventUseCases extends AbstractUseCases<
  IEvent,
  EventRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): EventRepository {
    return new EventRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IEvent {
    return {
      task: object.task as Types.ObjectId,
      leaseContract: object.leaseContract as Types.ObjectId
    };
  }

  async list(
    populateValues: Record<string, unknown>[] = [],
    query: Record<string, unknown> = {}
  ): Promise<Model[]> {
    return this.repository.list(populateValues, query);
  }

  async shouldCreateEvents(): Promise<string> {
    const events = await this.list();
    if (events.length > 0) return generateAuthUrl();
    return '';
  }
}
