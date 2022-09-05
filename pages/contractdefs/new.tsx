import type { NextPage } from 'next';
import { BurgerMenu } from '../../lib/components';
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
    <BurgerMenu
      content={
        <Form
          formFields={newContractsProps.formFields}
          successRedirect="/contractdefs"
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

export default NewContractDefs;
