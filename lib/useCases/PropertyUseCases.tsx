import IProperty from '../domain/entities/IProperty';
import IRepository from '../domain/repositories/base/IRepository';
import PropertyRepository from '../domain/repositories/PropertyRepository';

export default class PropertyUseCases {
  repository: IRepository<IProperty> = new PropertyRepository();

  async list(): Promise<IProperty[]> {
    return this.repository.list();
  }
}
