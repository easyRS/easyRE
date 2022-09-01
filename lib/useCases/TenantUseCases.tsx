import ITenant from '../domain/entities/ITenant';
import TenantRepository from '../domain/repositories/TenantRepository';
import AbstractUseCases from './AbstractUseCases';

export default class TenantUseCases extends AbstractUseCases<
  ITenant,
  TenantRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): TenantRepository {
    return new TenantRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): ITenant {
    return {
      name: object.name as string,
      phone: object.phone as string,
      notes: object.notes as string
    };
  }
}
