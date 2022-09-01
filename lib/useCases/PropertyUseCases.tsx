import IProperty from '../domain/entities/IProperty';
import PropertyRepository from '../domain/repositories/PropertyRepository';
import AbstractUseCases from './AbstractUseCases';

export default class PropertyUseCases extends AbstractUseCases<
  IProperty,
  PropertyRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): PropertyRepository {
    return new PropertyRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IProperty {
    return {
      coordinates: object.coordinates as [number],
      measure: object.measure as string,
      name: object.name as string,
      location_details: object.location_details as string,
      description: object.description as string
    };
  }
}
