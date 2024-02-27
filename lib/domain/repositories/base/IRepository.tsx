export default interface IRepository<Model> {
  className: string;
  create(obj: Model): Promise<Model>;
  findById(
    id: string,
    populateValues?: Record<string, unknown>[]
  ): Promise<Model>;
  findByQuery(query: Record<string, unknown>): Promise<Model | null>;
  findOneAndUpdate(
    id: string,
    obj: Model,
    returnUpdated: boolean
  ): Promise<Model>;
  removeById(id: string): Promise<void>;
  removeByQuery(query: Record<string, unknown>): Promise<void>;
  list(
    populateValues: Record<string, unknown>[],
    query: Record<string, unknown>
  ): Promise<Model[]>;
  getKeys(forbiddenFields?: string[]): Promise<ModelKeys>;
}
