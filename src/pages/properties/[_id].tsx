import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getProperty
} from '../../lib/controllers/PropertyController';

import IProperty from '../../lib/domain/entities/IProperty';
import callbacks from '../../lib/drivers/network/properties';

type EditPropertyProps = {
  formFields: ModelKeys;
  property: IProperty;
};

const EditProperties: NextPage<EditPropertyProps> = (
  propertiesProps: EditPropertyProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={propertiesProps.formFields}
          successRedirect="/properties"
          editObj={propertiesProps.property}
          callbacks={callbacks}
          canDelete
        />
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.query;
  const formFields = await getFormFields();
  const property = await getProperty(_id as string);
  return {
    props: { formFields, property }
  };
};

export default EditProperties;
