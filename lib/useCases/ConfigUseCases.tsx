import IConfig from '../domain/entities/IConfig';
import ConfigRepository from '../domain/repositories/ConfigRepository';
import AbstractUseCases from './AbstractUseCases';

export default class ConfigUseCases extends AbstractUseCases<
  IConfig,
  ConfigRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): ConfigRepository {
    return new ConfigRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IConfig {
    return {
      isDailyJobRunning: object.isDailyJobRunning as boolean
    };
  }

  async isDailyJobRunning(): Promise<boolean> {
    const job = await this.findByQuery({});
    if (!job) return false;

    return job.isDailyJobRunning;
  }

  async tagDailyJob(): Promise<void> {
    const job = await this.findByQuery({});
    if (!job) return;
    await this.update({ ...job, isDailyJobRunning: !job.isDailyJobRunning });
  }
}
