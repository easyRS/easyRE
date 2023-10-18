import IUser from '../domain/entities/IUser';
import UserUseCases from '../useCases/UserUseCases';

async function getUsers(): Promise<IUser[]> {
  return new UserUseCases().list();
}

async function getTableUsers(): Promise<TableMapping<IUserTable>> {
  const users = await getUsers();

  const labelsMapping: IUserTable = {
    email: 'Name',
    password: 'Password'
  };

  return {
    tableName: labelsMapping,
    arrayObj: users
  };
}

async function getUser(): Promise<IUser> {
  return new UserUseCases().findByQuery({});
}

async function getFormFields(
  _forbiddenFields: string[] = []
): Promise<ModelKeys> {
  const keys = await new UserUseCases().getKeys(_forbiddenFields);
  const editables = keys.editables.map((fieldData) => {
    const { name } = fieldData;

    const passwordFields = [
      'password',
      'google_client_id',
      'google_client_secret',
      'google_redirect_url',
      'google_api_key',
      'google_tokens'
    ];

    if (passwordFields.includes(name)) {
      return {
        ...fieldData,
        type: 'password'
      };
    }

    return {
      ...fieldData,
      type: 'text'
    };
  });

  return {
    ...keys,
    editables
  };
}
async function getAuthFormFields(): Promise<ModelKeys> {
  const forbbidenFields = [
    'google_client_id',
    'google_client_secret',
    'google_redirect_url',
    'google_api_key',
    'google_tokens'
  ];
  return getFormFields(forbbidenFields);
}

async function getProfileFields(): Promise<ModelKeys> {
  const forbbidenFields = ['password', 'email', 'google_tokens'];
  return getFormFields(forbbidenFields);
}

async function createUser(object: Record<string, unknown>) {
  return new UserUseCases().create(object);
}

async function updateUser(object: Record<string, unknown>) {
  return new UserUseCases().update(object);
}

async function removeUser(object: Record<string, unknown>) {
  return new UserUseCases().remove(object);
}

async function loginUser(email: string, password: string): Promise<IUser> {
  return new UserUseCases().loginUser(email, password);
}

export {
  createUser,
  getAuthFormFields,
  getFormFields,
  getProfileFields,
  getTableUsers,
  getUser,
  getUsers,
  loginUser,
  removeUser,
  updateUser
};
