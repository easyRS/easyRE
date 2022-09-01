import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { BurgerMenu } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getTenant
} from '../../lib/controllers/TenantController';
import callbacks from '../../lib/drivers/network/tenants';

type EditTenantProps = {
  formFields: ModelKeys;
  tenant: Record<string, unknown>;
};

const EditProperties: NextPage<EditTenantProps> = (
  tenantsProps: EditTenantProps
) => {
  return (
    <BurgerMenu
      content={
        <Form
          formFields={tenantsProps.formFields}
          successRedirect="/tenants"
          editObj={tenantsProps.tenant}
          callbacks={callbacks}
        />
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.query;
  const formFields = await getFormFields();
  const tenant = await getTenant(_id as string);
  return {
    props: { formFields, tenant }
  };
};

export default EditProperties;
