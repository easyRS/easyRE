import IRepository from '../domain/repositories/base/IRepository';

export default abstract class AbstractUseCases<
  Model,
  BaseRepository extends IRepository<Model>
> {
  repository: IRepository<Model>;

  constructor() {
    this.repository = this.buildRepository();
  }

  abstract buildRepository(): BaseRepository;

  abstract buildFrom(object: Record<string, unknown>): Model;

  async create(object: Record<string, unknown>): Promise<Model> {
    const newProperties: Model = this.buildFrom(object);
    return this.repository.create(newProperties);
  }

  async update(object: Record<string, unknown>): Promise<void> {
    const id = object._id as string;
    const updatedProperty: Model = this.buildFrom(object);
    return this.repository.findOneAndUpdate(id, updatedProperty);
  }

  async remove(object: Record<string, unknown>): Promise<void> {
    const id = object._id as string;
    return this.repository.removeById(id);
  }

  async removeByQuery(query: Record<string, unknown>): Promise<void> {
    return this.repository.removeByQuery(query);
  }

  async list(): Promise<Model[]> {
    return this.repository.list([], {});
  }

  async findById(
    _id: string,
    populateValuesParam?: Record<string, unknown>[]
  ): Promise<Model> {
    return this.repository.findById(_id, populateValuesParam);
  }

  async findByQuery(query: Record<string, unknown>): Promise<Model | null> {
    return this.repository.findByQuery(query);
  }

  async getKeys(_forbiddenFields: string[] = []): Promise<ModelKeys> {
    return this.repository.getKeys(_forbiddenFields);
  }
}
