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

  /* eslint-disable-line class-methods-use-this */ buildObject(
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

  async create(object: Record<string, unknown>): Promise<IProperty> {
    const newProperties: IProperty = {
      coordinates: object.coordinates as [number],
      measure: object.measure as string,
      name: object.name as string,
      location_details: object.location_details as string,
      description: object.description as string
    };
    return this.repository.create(newProperties);
  }

  async update(object: Record<string, unknown>): Promise<void> {
    const id = object._id as string;
    const updatedProperty: IProperty = {
      coordinates: object.coordinates as [number],
      measure: object.measure as string,
      name: object.name as string,
      location_details: object.location_details as string,
      description: object.description as string
    };

    return this.repository.findOneAndUpdate(id, updatedProperty);
  }

  async remove(object: Record<string, unknown>): Promise<void> {
    const id = object._id as string;
    return this.repository.removeById(id);
  }

  async list(): Promise<IProperty[]> {
    return this.repository.list();
  }

  async findById(_id: string): Promise<IProperty> {
    return this.repository.findById(_id);
  }

  async getKeys(): Promise<ModelKeys> {
    return this.repository.getKeys();
  }
}
