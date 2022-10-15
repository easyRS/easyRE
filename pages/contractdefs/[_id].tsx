import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getContractDef,
  getFormFields
} from '../../lib/controllers/ContractDefController';
import IContractDefinition from '../../lib/domain/entities/IContractDefinition';
import callbacks from '../../lib/drivers/network/contractdefs';

type EditContractDefProps = {
  formFields: ModelKeys;
  contractdef: IContractDefinition;
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
          successRedirect="/contractdefs"
          editObj={contractdefsProps.contractdef}
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
  const contractdef = await getContractDef(_id as string);
  return {
    props: { formFields, contractdef }
  };
};

export default EditContract;
