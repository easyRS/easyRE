export default interface IRepository<Model> {
  className: string;
  create(obj: Record<string, unknown>): Model;
  findById(id: string): Model;
  list(): Model[];
}
