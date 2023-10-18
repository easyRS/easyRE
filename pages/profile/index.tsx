import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TopNavigation } from '../../lib/components';
import Form from '../../lib/components/Form/Form';

import {
  getProfileFields,
  getUser
} from '../../lib/controllers/UserController';
import callbacks from '../../lib/drivers/network/users';

import IUser from '../../lib/domain/entities/IUser';

type ProfileProps = {
  formFields: ModelKeys;
  user: IUser;
};

const Profile: NextPage<ProfileProps> = (usersProps: ProfileProps) => {
  const router = useRouter();

  const _onSubmit = async (dataUnkown: IEntity) => {
    await callbacks.updateCallback({ ...dataUnkown });
    router.push('/');
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
              maxWidth: '500px',
              position: 'relative',
              right: '-30%',
              flexDirection: 'column'
            }}
          >
            <h3
              style={{
                textAlign: 'start',
                lineHeight: '2rem',
                marginTop: '0'
              }}
            >
              Edit, then hit submit to save:
            </h3>
          </div>

          <Form
            formFields={usersProps.formFields}
            successRedirect="/"
            callbacks={callbacks}
            canDelete={false}
            onSubmit={_onSubmit}
            editObj={usersProps.user}
          />
        </div>
      }
    />
  );
};

export async function getServerSideProps() {
  const formFields = await getProfileFields();
  const user = await getUser();
  return {
    props: { formFields, user }
  };
}

export default Profile;
