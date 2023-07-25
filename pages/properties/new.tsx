import type { NextPage } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getFormFields } from '../../lib/controllers/PropertyController';
import callbacks from '../../lib/drivers/network/properties';

type NewPropertyProps = {
  formFields: ModelKeys;
  domainUrl: string;
};

const NewProperties: NextPage<NewPropertyProps> = (
  propertiesProps: NewPropertyProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={propertiesProps.formFields}
          successRedirect="/properties"
          callbacks={callbacks}
          canDelete={false}
          domainUrl={propertiesProps.domainUrl}
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
