import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import { getContractDefs } from '../../lib/controllers/ContractDefController';
import { getFormFields as contractFormFields } from '../../lib/controllers/LeaseContractController';
import {
  getFormFields as propertyFormFields,
  getProperties
} from '../../lib/controllers/PropertyController';
import {
  getFormFields as tenantFormFields,
  getTenants
} from '../../lib/controllers/TenantController';
import leaseCalls from '../../lib/drivers/network/main';
import callbacks from '../../lib/drivers/network/tenants';

import IContractDefinition from '../../lib/domain/entities/IContractDefinition';
import IProperty from '../../lib/domain/entities/IProperty';
import ITenant from '../../lib/domain/entities/ITenant';

import Button from '../../lib/components/Button/Button';
import { useObjValues } from '../../lib/utils/mainHooks';
import styles from './index.module.css';

type SelectValue = [ITenant[], IProperty[], IContractDefinition[]];

type NewPropertyProps = {
  formFieldsArray: ModelKeys[];
  selectValues: SelectValue;
};

const Main: NextPage<NewPropertyProps> = (props: NewPropertyProps) => {
  const [values, onValueChanged, index, setIndex, objValues] = useObjValues(
    props.selectValues
  );
  const [completed, setSetCompleted] = useState<boolean>(false);
  const form = useForm();

  const currentObj = objValues[index]; /* eslint-disable-line*/
  const formFields: ModelKeys = props.formFieldsArray[index as number];

  const router = useRouter();

  useEffect(() => {
    async function create() {
      const { createCallback } = leaseCalls;
      await createCallback(objValues);
      router.push('/leases');
    }

    if (completed) {
      // console.log(objValues);
      create();
    }
  }, [completed, objValues, router]);

  const forwardCallBack = (data: IEntity) => {
    const _index = index;
    const unknownTest = data as unknown;
    const genericData = unknownTest as Record<string, unknown>;
    let dataParam = data;
    if (_index === 1) {
      const latitude = parseFloat(genericData.latitude as string);
      const longitude = parseFloat(genericData.longitude as string);
      const coordinates = [
        latitude > 0
          ? latitude
          : parseFloat((genericData.coordinates as string[])[0]),
        longitude > 0
          ? longitude
          : parseFloat((genericData.coordinates as string[])[1])
      ];

      dataParam = {
        ...dataParam,
        coordinates
      };
    }

    onValueChanged(dataParam);

    if (_index === 2) setSetCompleted(true);
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
      (value) => value._id?.toString() === event.target.value
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
