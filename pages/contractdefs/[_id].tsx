import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { BurgerMenu } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import {
  getContractDef,
  getFormFields
} from '../../lib/controllers/ContractDefController';
import callbacks from '../../lib/drivers/network/contractdefs';

type EditContractDefProps = {
  formFields: ModelKeys;
  contractdef: Record<string, unknown>;
};

const EditProperties: NextPage<EditContractDefProps> = (
  contractdefsProps: EditContractDefProps
) => {
  return (
    <BurgerMenu
      content={
        <Form
          formFields={contractdefsProps.formFields}
          successRedirect="/contractdefs"
          editObj={contractdefsProps.contractdef}
          callbacks={callbacks}
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

export default EditProperties;
