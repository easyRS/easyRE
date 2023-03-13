import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getFormFields,
  getLeaseContract
} from '../../lib/controllers/LeaseContractController';
import ILeaseContract from '../../lib/domain/entities/ILeaseContract';
import callbacks from '../../lib/drivers/network/leases';

type EditContractDefProps = {
  formFields: ModelKeys;
  leasecontract: ILeaseContract;
};

const EditContract: NextPage<EditContractDefProps> = (
  contractdefsProps: EditContractDefProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={contractdefsProps.formFields}
          successRedirect="/leases"
          editObj={contractdefsProps.leasecontract}
          callbacks={callbacks}
          canDelete={false}
        />
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { _id } = context.query;
  const formFields = await getFormFields();
  const leasecontract = await getLeaseContract(_id as string);
  return {
    props: { formFields, leasecontract }
  };
};

export default EditContract;
