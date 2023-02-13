export default interface IRepository<Model> {
  className: string;
  create(obj: Model): Promise<Model>;
  findById(id: string): Promise<Model>;
  findByQuery(query: Record<string, unknown>): Promise<Model>;
  findOneAndUpdate(id: string, obj: Model): Promise<void>;
  removeById(id: string): Promise<void>;
  removeByQuery(query: Record<string, unknown>): Promise<void>;
  list(): Promise<Model[]>;
  getKeys(forbiddenFields?: string[]): Promise<ModelKeys>;
}
