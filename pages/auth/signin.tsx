import type { NextPage } from 'next';
import { signIn } from 'next-auth/react';
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
        <Form
          formFields={usersProps.formFields}
          successRedirect="/"
          callbacks={callbacks}
          canDelete={false}
          onSubmit={_onSubmit}
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

export default SignIn;
