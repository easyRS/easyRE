export default interface IRepository<Model> {
  className: string;
  create(obj: Model): Promise<Model>;
  findById(id: string): Promise<Model>;
  findOneAndUpdate(id: string, obj: Model): Promise<void>;
  removeById(id: string): Promise<void>;
  list(): Promise<Model[]>;
  getKeys(): Promise<ModelKeys>;
}
