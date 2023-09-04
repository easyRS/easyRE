import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getFormFields } from '../../lib/controllers/UserController';
import callbacks from '../../lib/drivers/network/users';

import IUser from '../../lib/domain/entities/IUser';

type SignInProps = {
  formFields: ModelKeys;
};

const SignIn: NextPage<SignInProps> = (usersProps: SignInProps) => {
  const _onSubmit = async (dataUnkown: IEntity) => {
    const user = dataUnkown as IUser;
    await signIn('credentials', {
      email: user.email,
      password: user.password,
      callbackUrl: '/'
    });
  };

  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <Form
            formFields={usersProps.formFields}
            successRedirect="/"
            callbacks={callbacks}
            canDelete={false}
            onSubmit={_onSubmit}
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
            <Link href="/auth/signup">Sign Up</Link>
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

export default SignIn;
