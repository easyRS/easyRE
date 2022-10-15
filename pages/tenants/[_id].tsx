import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getTenant
} from '../../lib/controllers/TenantController';
import ITenant from '../../lib/domain/entities/ITenant';
import callbacks from '../../lib/drivers/network/tenants';

type EditTenantProps = {
  formFields: ModelKeys;
  tenant: ITenant;
};

const EditProperties: NextPage<EditTenantProps> = (
  tenantsProps: EditTenantProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={tenantsProps.formFields}
          successRedirect="/tenants"
          editObj={tenantsProps.tenant}
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
  const tenant = await getTenant(_id as string);
  return {
    props: { formFields, tenant }
  };
};

export default EditProperties;
