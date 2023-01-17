// disabling because of @typescript-eslint/no-explicit-any @typescript-eslint/no-unused-vars eslint-disable no-unused-vars

/* eslint-disable */

import { Document, ToObjectOptions } from 'mongoose';
import IRepository from './IRepository';

import { connect } from '../../../drivers/database/conn';

export default abstract class MongooseAbstractRepository<ModelGeneric>
  implements IRepository<ModelGeneric>
{
  className: string = '';
  schemaName: string = '';

  constructor(_className: string, _schemaName: string) {
    this.className = _className;
    this.schemaName = _schemaName;
  }

  async _getModelTable() {
    const connectionValues = await connect();
    const className: string = this.className;
    const ModelTable = (connectionValues as any)[className];
    return ModelTable;
  }

  async _getFieldType(fieldName: string): Promise<string> {
    const connectionValues = await connect();
    const schemaName: string = this.schemaName;
    const SchemaTable = (connectionValues as any)[schemaName];
    return SchemaTable.path(fieldName).instance as string;
  }

  async getKeys(_forbiddenFields: string[] = []): Promise<ModelKeys> {
    const ModelTable = await this._getModelTable();
    const allfields = Object.keys(ModelTable.schema.tree);
    const forbiddenFields: string[] = [
      ..._forbiddenFields,
      '_id',
      '_v',
      'id',
      '__v'
    ];

    const editableFields = allfields.filter(
      (field: string) =>
        !forbiddenFields.some((currentField) => currentField === field)
    );

    const array = await Promise.all(
      editableFields.map(async (field: string): Promise<FieldData> => {
        const type: string = await this._getFieldType(field);
        const unformated = field.replace('_', ' ');
        const displayValue = unformated[0].toUpperCase() + unformated.slice(1);
        return {
          name: field,
          type: type,
          display_value: displayValue
        };
      }, this)
    );

    return {
      all: allfields,
      editables: array
    };
  }

  async create(obj: ModelGeneric): Promise<ModelGeneric> {
    const ModelTable = await this._getModelTable();
    const newObj = new ModelTable(obj);

    await newObj.save();
    return this.toJson(newObj);
  }

  async findOneAndUpdate(id: string, obj: ModelGeneric): Promise<void> {
    const ModelTable = await this._getModelTable();
    await ModelTable.findOneAndUpdate({ _id: id }, obj);
  }

  async removeById(id: string): Promise<void> {
    const ModelTable = await this._getModelTable();
    await ModelTable.deleteOne({ _id: id });
  }

  async findById(id: string): Promise<ModelGeneric> {
    const ModelTable = await this._getModelTable();
    const objDocument = await ModelTable.findById(id).exec();
    return this.toJson(objDocument);
  }

  async findByQuery(query: Record<string, unknown>): Promise<ModelGeneric> {
    const ModelTable = await this._getModelTable();
    const objDocument = await ModelTable.findOne(query).exec();
    return this.toJson(objDocument);
  }

  async list(populateValues: string[] = []): Promise<ModelGeneric[]> {
    const ModelTable = await this._getModelTable();
    const queryResult = await ModelTable.find().populate(populateValues).lean();

    return queryResult.map((obj: any) => {
      return { ...obj, _id: obj._id.toString() };
    });
  }

  toJson(obj: Document) {
    const options: ToObjectOptions & { flattenMaps: false } = {
      transform: (_1: any, ret: any, _2: any): any => {
        const { _id: removedId, __v: removedV, ...newRet } = ret;
        return { _id: ret._id.toString(), ...newRet };
      },
      flattenMaps: false
    };
    return obj.toJSON<ModelGeneric>(options);
  }
}
