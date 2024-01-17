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
  list(
    populateValues: Record<string, unknown>[],
    query: Record<string, unknown>
  ): Promise<ModelGeneric[]> {
    throw new Error('Method not implemented.');
  }

  async _getModelTable(): Promise<any> {
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

  async _getEnumValues(fieldName: string): Promise<string[]> {
    const connectionValues = await connect();
    const schemaName: string = this.schemaName;
    const SchemaTable = (connectionValues as any)[schemaName];
    return SchemaTable.path(fieldName).enumValues as string[];
  }

  async _getIsRequired(fieldName: string): Promise<boolean> {
    const connectionValues = await connect();
    const schemaName: string = this.schemaName;
    const SchemaTable = (connectionValues as any)[schemaName];
    return SchemaTable.path(fieldName).isRequired as boolean;
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
        const enumValues: string[] = await this._getEnumValues(field);
        const unformated = field.replace('_', ' ');
        const displayValue = unformated[0].toUpperCase() + unformated.slice(1);
        const isRequired: boolean = await this._getIsRequired(field);
        return {
          name: field,
          type: type,
          display_value: displayValue,
          isRequired: isRequired || false,
          options: enumValues || null
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

  async removeByQuery(query: Record<string, unknown>): Promise<void> {
    const ModelTable = await this._getModelTable();
    await ModelTable.deleteMany(query);
  }

  async findById(
    id: string,
    populateValues: Record<string, unknown>[] = []
  ): Promise<ModelGeneric> {
    const ModelTable = await this._getModelTable();
    const objDocument = await ModelTable.findById(id)
      .populate(populateValues)
      .exec();
    return this.toJson(objDocument);
  }

  async findByQuery(
    query: Record<string, unknown>
  ): Promise<ModelGeneric | null> {
    const ModelTable = await this._getModelTable();
    const objDocument = await ModelTable.findOne(query).exec();

    return objDocument ? this.toJson(objDocument) : null;
  }

  async list(
    populateValues: Record<string, unknown>[] = [],
    query: Record<string, unknown> = {}
  ): Promise<ModelGeneric[]> {
    const ModelTable = await this._getModelTable();
    const queryResult = await ModelTable.find(query)
      .populate(populateValues)
      .exec();

    return queryResult.map((obj: any) => {
      return this.toJson(obj);
    }, this);
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
