import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getContractDefs,
  getFormFields as contractFormFields
} from '../../lib/controllers/ContractDefController';
import {
  getFormFields as propertyFormFields,
  getProperties
} from '../../lib/controllers/PropertyController';
import {
  getFormFields as tenantFormFields,
  getTenants
} from '../../lib/controllers/TenantController';
import callbacks from '../../lib/drivers/network/tenants';

import IContractDefinition from '../../lib/domain/entities/IContractDefinition';
import IProperty from '../../lib/domain/entities/IProperty';
import ITenant from '../../lib/domain/entities/ITenant';

import Button from '../../lib/components/Button/Button';
import styles from './index.module.css';

type SelectValue = [ITenant[], IProperty[], IContractDefinition[]];

type NewPropertyProps = {
  formFieldsArray: ModelKeys[];
  selectValues: SelectValue;
};

type ObjValuesHook = [
  values: ITenant[] | IProperty[] | IContractDefinition[],
  onValueChanged: (data: IEntity) => void,
  index: number,
  setIndex: React.Dispatch<React.SetStateAction<number>>,
  objValues: IEntity[]
];

const useObjValues = (selectValues: SelectValue): ObjValuesHook => {
  const [index, setIndex] = useState<number>(0);
  const [objValues, setObjValues] = useState<IEntity[]>([
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
    });
    setObjValues(newObjValues);
  };

  useEffect(() => {
    setValues(selectValues[index]); /* eslint-disable-line*/
  }, [index, selectValues]);

  return [values, onValueChanged, index, setIndex, objValues];
};

const Main: NextPage<NewPropertyProps> = (props: NewPropertyProps) => {
  const [values, onValueChanged, index, setIndex, objValues] = useObjValues(
    props.selectValues
  );
  const form = useForm();

  const currentObj = objValues[index]; /* eslint-disable-line*/
  const formFields: ModelKeys = props.formFieldsArray[index as number];

  const forwardCallBack = (data: IEntity) => {
    onValueChanged(data);
    const _index = index;
    setIndex(_index === 2 ? 0 : _index + 1);

    const { reset } = form;
    reset();
  };

  const backwardCallBack = () => {
    const _index = index;
    setIndex(_index === 0 ? 2 : _index - 1);
    const { reset } = form;
    reset();
  };

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const selectedObj = (values as Array<IEntity>).find(
      (value) => value._id === event.target.value
    );

    if (selectedObj) onValueChanged(selectedObj);
  };

  const pickTitle = (): string => {
    if (index === 0) return 'Tenant';
    if (index === 1) return 'Property';
    return 'Contract';
  };

  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <div>
            <h1>Dynamic header here</h1>
          </div>

          <div className={styles.contentContainer}>
            <div className={styles.summaryContainer}>
              <h3>Here comes the summary</h3>
              <Button onClick={backwardCallBack}>Back</Button>
            </div>
            <div className={styles.formContainer}>
              <div>
                <h4>
                  Pick a {pickTitle()}:
                  <select onChange={onChange}>
                    {' '}
                    <option value="N/A">N/A</option>
                    {values.map((value) => (
                      <option value={value._id}>{value.name}</option>
                    ))}
                  </select>
                </h4>
              </div>
              <Form
                form={form}
                formFields={formFields}
                successRedirect="/tenants"
                callbacks={callbacks}
                canDelete={false}
                onSubmit={forwardCallBack}
                editObj={currentObj} /* eslint-disable-line*/
              />
            </div>
          </div>
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const _tenantFormFields = await tenantFormFields();
  const _propertyFormFields = await propertyFormFields();
  const _contractFormFields = await contractFormFields();

  const tenants = await getTenants();
  const properties = await getProperties();
  const contracts = await getContractDefs();

  const selectValues = [tenants, properties, contracts];

  const formFieldsArray = [
    _tenantFormFields,
    _propertyFormFields,
    _contractFormFields
  ];
  return {
    props: { formFieldsArray, selectValues }
  };
}

export default Main;
