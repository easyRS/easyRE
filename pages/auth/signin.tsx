import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getAuthFormFields } from '../../lib/controllers/UserController';
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
          <div
            style={{
              display: 'flex',
              marginTop: '30px',
              maxWidth: 'var(--form-max-width)',
              position: 'relative',
              right: '-2%',
              flexDirection: 'column',
              fontSize: 'var(--button-font-size)'
            }}
          >
            <Image
              src="/images/logo.png"
              style={{
                width: '5.5rem',
                height: '5.5rem',
                alignSelf: 'center'
              }}
              alt="My Image"
              width={200}
              height={200}
            />
            <h3
              style={{
                textAlign: 'start',
                lineHeight: '2rem',
                marginTop: '0'
              }}
            >
              Sign in:
            </h3>
          </div>

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
              maxWidth: 'var(--form-max-width)',
              margin: '10px auto',
              background: 'white',
              textAlign: 'left',
              borderRadius: 'var(--border-radius-container)',
              boxShadow: 'var(--box-shadow-container)',
              fontSize: 'var(--button-font-size)'
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
  const formFields = await getAuthFormFields();

  return {
    props: { formFields }
  };
}

export default SignIn;
