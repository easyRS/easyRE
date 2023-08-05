import type { NextPage } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getFormFields } from '../../lib/controllers/TaskController';
import callbacks from '../../lib/drivers/network/tasks';

type NewPropertyProps = {
  formFields: ModelKeys;
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
          successRedirect="/tasks"
          callbacks={callbacks}
          canDelete={false}
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
