export default interface IRepository<Model> {
  className: string;
  create(obj: Record<string, unknown>): Promise<Model>;
  findById(id: string): Model;
  list(): Promise<Model[]>;
}
