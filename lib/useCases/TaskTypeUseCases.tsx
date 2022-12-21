import ITaskType from '../domain/entities/ITaskType';
import TaskTypeRepository from '../domain/repositories/TaskTypeRepository';
import AbstractUseCases from './AbstractUseCases';

export default class TaskTypeUseCases extends AbstractUseCases<
  ITaskType,
  TaskTypeRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): TaskTypeRepository {
    return new TaskTypeRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ITaskType {
    return {
      name: object.name as string,
      description: object.description as string
    };
  }
}
