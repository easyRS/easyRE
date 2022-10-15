import type { NextPage } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';
import { getFormFields } from '../../lib/controllers/ContractDefController';

import callbacks from '../../lib/drivers/network/contractdefs';

type NewPropertyProps = {
  formFields: ModelKeys;
};

const NewContractDefs: NextPage<NewPropertyProps> = (
  newContractsProps: NewPropertyProps
) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={newContractsProps.formFields}
          successRedirect="/contractdefs"
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

export default NewContractDefs;
