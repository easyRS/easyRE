import { NextRouter } from 'next/router';
import { FieldValues } from 'react-hook-form';
import { FormProps } from './types';

export default (router: NextRouter, propertiesProps: FormProps) => {
  const { editObj, callbacks, onSubmit } = propertiesProps;
  const { createCallback, updateCallback, deleteCallback } = callbacks;
  const _defaultOnSubmit = async (data: IEntity) => {
    if (editObj) await updateCallback({ ...editObj, ...data });
    else await createCallback(data);
    router.push(propertiesProps.successRedirect);
  };

  const _onSubmit = async (data: FieldValues) => {
    const _data = data as IEntity;

    if (onSubmit) return onSubmit({ ...editObj, ..._data });

    await _defaultOnSubmit(_data);

    return 0; // eslint rule
  };

  const onDelete = async () => {
    if (editObj) {
      await deleteCallback(editObj as IEntity);
      router.push(propertiesProps.successRedirect);
    }
  };

  return {
    onSubmit: _onSubmit,
    onDelete
  };
};
