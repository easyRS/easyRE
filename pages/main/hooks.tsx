import React, { useEffect, useState } from 'react';

import IContractDefinition from '../../lib/domain/entities/IContractDefinition';
import IProperty from '../../lib/domain/entities/IProperty';
import ITenant from '../../lib/domain/entities/ITenant';

type ObjValuesHook = [
  values: ITenant[] | IProperty[] | IContractDefinition[],
  onValueChanged: (data: IEntity) => void,
  index: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  objValues: StepMapper
];

type SelectValue = [ITenant[], IProperty[], IContractDefinition[]];

export const useObjValues = (selectValues: SelectValue): ObjValuesHook => {
  const [index, setIndex] = useState<number>(0);
  const [objValues, setObjValues] = useState<StepMapper>([
    {} as IEntity,
    {} as IEntity,
    {} as IEntity
  ]);
  const [values, setValues] = useState<
    ITenant[] | IProperty[] | IContractDefinition[]
  >([]);

  const onValueChanged = (data: IEntity) => {
    const newObjValues = objValues.map((value, _index) => {
      if (_index === index) return { ...data };
      return { ...value };
    }) as StepMapper;
    setObjValues(newObjValues);
  };

  useEffect(() => {
    setValues(selectValues[index]); /* eslint-disable-line*/
  }, [index, selectValues]);

  return [values, onValueChanged, index, setIndex, objValues];
};
