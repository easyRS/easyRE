import type { NextPage } from 'next';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getFormFields } from '../../lib/controllers/UserController';
import callbacks from '../../lib/drivers/network/users';

type SignUpProps = {
  formFields: ModelKeys;
};

const SignUp: NextPage<SignUpProps> = (usersProps: SignUpProps) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <Form
          formFields={usersProps.formFields}
          successRedirect="/auth/signin"
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

export default SignUp;
