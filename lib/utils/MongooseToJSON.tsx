// disabling because of @typescript-eslint/no-explicit-any @typescript-eslint/no-unused-vars eslint-disable no-unused-vars

/* eslint-disable */

import { Document, ToObjectOptions } from 'mongoose';

const toJson = <T,>(obj: Document) => {
  const options: ToObjectOptions = {
    transform: (_1: any, ret: any, _2: any): any => {
      const { _id: removedId, __v: removedV, ...newRet } = ret;
      return { _id: ret._id.toString(), ...newRet };
    }
  };
  return obj.toJSON<T>(options);
};

export default toJson;
