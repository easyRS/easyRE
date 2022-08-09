// disabling because of @typescript-eslint/no-explicit-any @typescript-eslint/no-unused-vars eslint-disable no-unused-vars

/* eslint-disable */

import { Document, ToObjectOptions } from 'mongoose';
import IRepository from './IRepository';

import { connect } from '../../../drivers/database/conn';

export default abstract class MongooseAbstractRepository<ModelGeneric>
  implements IRepository<ModelGeneric>
{
  className: string = '';

  constructor(_className: string) {
    this.className = _className;
  }

  findById(id: string): ModelGeneric {
    throw new Error('Method not implemented.');
  }

  async _getModelTable() {
    const connectionValues = await connect();
    const className: string = this.className;
    const ModelTable = (connectionValues as any)[className];
    return ModelTable;
  }

  async create(obj: Record<string, unknown>): Promise<ModelGeneric> {
    const ModelTable = await this._getModelTable();
    const newObj = new ModelTable(obj);

    await newObj.save();
    return this.toJson(newObj);
  }

  async list(): Promise<ModelGeneric[]> {
    const ModelTable = await this._getModelTable();
    const queryResult = await ModelTable.find().lean();
    return queryResult.map((obj) => {
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
