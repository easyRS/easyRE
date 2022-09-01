import type { NextPage } from 'next';
import { BurgerMenu } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import { getFormFields } from '../../lib/controllers/TenantController';

import callbacks from '../../lib/drivers/network/tenants';

type NewPropertyProps = {
  formFields: ModelKeys;
};

const NewTenants: NextPage<NewPropertyProps> = (
  tenantsProps: NewPropertyProps
) => {
  return (
    <BurgerMenu
      content={
        <Form
          formFields={tenantsProps.formFields}
          successRedirect="/tenants"
          callbacks={callbacks}
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

export default NewTenants;
