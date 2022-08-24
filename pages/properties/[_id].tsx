import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { BurgerMenu } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getProperty
} from '../../lib/controllers/PropertyController';

type EditPropertyProps = {
  formFields: ModelKeys;
  property: Record<string, unknown>;
};

const EditProperties: NextPage<EditPropertyProps> = (
  propertiesProps: EditPropertyProps
) => {
  return (
    <BurgerMenu
      content={
        <Form
          formFields={propertiesProps.formFields}
          successRedirect="/properties"
          editObj={propertiesProps.property}
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
