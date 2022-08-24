import type { NextPage } from 'next';
import { BurgerMenu } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import { getFormFields } from '../../lib/controllers/PropertyController';

type NewPropertyProps = {
  formFields: ModelKeys;
};

const NewProperties: NextPage<NewPropertyProps> = (
  propertiesProps: NewPropertyProps
) => {
  return (
    <BurgerMenu
      content={
        <Form
          formFields={propertiesProps.formFields}
          successRedirect="/properties"
        />
      }
    />
  );
};

export async function getServerSideProps() {
  const formFields = await getFormFields();

  return {
    props: { formFields }
  };
}

export default NewProperties;
