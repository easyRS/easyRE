import bcrypt from 'bcrypt';
import IUser from '../domain/entities/IUser';
import UserRepository from '../domain/repositories/UserRepository';
import AbstractUseCases from './AbstractUseCases';

export default class UserUseCases extends AbstractUseCases<
  IUser,
  UserRepository
> {
  /* eslint-disable-line class-methods-use-this */ buildRepository(): UserRepository {
    return new UserRepository();
  }

  /* eslint-disable-line class-methods-use-this */ buildFrom(
    object: Record<string, unknown>
  ): IUser {
    return {
      email: object.email as string,
      password: object.password as string
    };
  }

  async create(unknownObj: Record<string, unknown>): Promise<IUser> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(unknownObj.password, saltRounds);

    const newUser = {
      ...unknownObj,
      password: hashedPassword
    };

    return super.create(newUser);
  }

  async loginUser(email: string, password: string): Promise<IUser> {
    const user = await await this.findByQuery({ email });

    if (!user) {
      throw new Error('User not found');
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Error('Incorrect password');
    }

    // Proceed with login logic
    return user;
  }
}
