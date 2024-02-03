import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import { getAuthFormFields } from '../../lib/controllers/UserController';
import callbacks from '../../lib/drivers/network/users';

import styles from './index.module.css';

type SignUpProps = {
  formFields: ModelKeys;
};

const SignUp: NextPage<SignUpProps> = (usersProps: SignUpProps) => {
  return (
    <TopNavigation
      isOpen={false}
      content={
        <div>
          <div className={styles.headerContainer}>
            <Image
              src="/images/logo.png"
              style={{
                marginLeft: '20px',
                width: '4rem',
                height: '3.6rem',
                cursor: 'pointer'
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
              Sign up:
            </h3>
          </div>
          <Form
            formFields={usersProps.formFields}
            successRedirect="/auth/signin"
            callbacks={callbacks}
            canDelete={false}
          />
          <div className={styles.belowContainer}>
            <Link href="/auth/signin">Sign In</Link>
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

export default SignUp;
