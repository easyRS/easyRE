import type { NextPage } from 'next';
import Link from 'next/link';
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
        <div>
          <Form
            formFields={usersProps.formFields}
            successRedirect="/auth/signin"
            callbacks={callbacks}
            canDelete={false}
          />
          <div
            style={{
              padding: '1rem 2rem',
              maxWidth: '500px',
              margin: '10px auto',
              background: 'white',
              textAlign: 'left',
              borderRadius: '1rem',
              boxShadow: '0 0 3px var(--cadet-gray)'
            }}
          >
            <Link href="/auth/signin">Sign In</Link>
          </div>
        </div>
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
