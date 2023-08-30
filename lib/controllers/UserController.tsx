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

async function getUser(_id: string): Promise<IUser> {
  return new UserUseCases().findById(_id);
}

async function getFormFields(): Promise<ModelKeys> {
  const keys = await new UserUseCases().getKeys();
  const editables = keys.editables.map((fieldData) => {
    const { name } = fieldData;

    if (name === 'password') {
      return {
        ...fieldData,
        type: 'text'
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
  getFormFields,
  getTableUsers,
  getUser,
  getUsers,
  loginUser,
  removeUser,
  updateUser
};
